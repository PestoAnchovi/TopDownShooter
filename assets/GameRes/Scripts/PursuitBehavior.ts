import { _decorator, Component, math, Node, Vec2 } from 'cc';
import { ISteeringBehavior } from './ISteeringBehavior';
import { SeekBehavior } from './SeekBehavior';
const { ccclass, property } = _decorator;

export class PursuitBehavior implements ISteeringBehavior {
    
    private seekBehavior: SeekBehavior = new SeekBehavior()
    private pursuerSpeed: number
    private maxPredictionTime: number

    constructor(pursuerSpeed: number, maxPredictionTime: number) {
        this.pursuerSpeed = pursuerSpeed
        this.maxPredictionTime
    }
    getDesiredVelocity(currentPosition: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        if (!targetPosition) return Vec2.ZERO
        
        if (!targetVelocity || targetVelocity.lengthSqr() === 0) {
            return this.seekBehavior.getDesiredVelocity(currentPosition, targetPosition)
        }

        let distance = Vec2.distance(currentPosition, targetPosition)

        let predictionTime = distance / this.pursuerSpeed

        if (predictionTime > this.maxPredictionTime) {
            predictionTime = this.maxPredictionTime
        }

        let predictedPosition = new Vec2
        let furtureTravel = targetVelocity.clone().multiplyScalar(predictionTime)
        Vec2.add(predictedPosition, targetPosition, futureTarget)
    }
}


