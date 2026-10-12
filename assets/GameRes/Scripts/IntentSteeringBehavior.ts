import { _decorator, Component, math, Node, Vec2 } from 'cc';
import { ISteeringBehavior } from './ISteeringBehavior';
import { IntentConfig } from './EnemyConfig';
import { SeekBehavior } from './SeekBehavior';
import { FleeBehavior } from './FleeBehavior';
import { PursuitBehavior } from './PursuitBehavior';
const { ccclass, property } = _decorator;


export class IntentSteeringBehavior implements ISteeringBehavior {

    private intent: IntentConfig
    private seekBehavior: SeekBehavior = new SeekBehavior()
    private fleeBehavior: FleeBehavior = new FleeBehavior()
    private pursuitBehavior: PursuitBehavior 

    public setWeights(steering: IntentConfig) {
        this.intent = steering
        this.pursuitBehavior = new PursuitBehavior(steering.maxSpeed, steering.maxPredictionTime)
    }

    getDesiredVelocity(currentPosition: math.Vec2, targetPosition?: Readonly<math.Vec2>, targetVelocity?: Readonly<Vec2>): math.Vec2 {
        let totalSteeringForce = new Vec2

        if(!targetPosition) return totalSteeringForce
        
        if (this.intent.seekWeight > 0 && targetPosition){
            let seekForce = this.seekBehavior.getDesiredVelocity(currentPosition, targetPosition)
            seekForce.multiplyScalar(this.intent.seekWeight)
            totalSteeringForce.add(seekForce)
        }

        if (this.intent.fleeWeight > 0 && targetPosition){
            let fleeForce = this.fleeBehavior.getDesiredVelocity(currentPosition, targetPosition)
            fleeForce.multiplyScalar(this.intent.seekWeight)
            totalSteeringForce.add(fleeForce)
        }

        if (totalSteeringForce.lengthSqr() > 1.0) {
            totalSteeringForce.normalize()
        }
        return totalSteeringForce
    }
  
}


