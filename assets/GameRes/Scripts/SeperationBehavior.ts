import { Vec2 } from "cc";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { ISteeringBehavior } from "./ISteeringBehavior";

export class SeperationBehavior implements ISteeringBehavior {
    private brain: EnemyMovementSystem
    private separationRadius: number

    constructor(movementSystem: EnemyMovementSystem, seperationRadius: number) {
        this.brain = movementSystem
        this.separationRadius = seperationRadius

    getDesiredvelocity(currentPosition: math.Vec2, targetPosition?: Readonly <math.Vec2>): math.Vec2 {
        let neighbors = this.brain.getNeighbors()
        let separationForce = new Vec2

        if (neighbors.length <= 0) return separationForce
        
        let pushCount = 0

        for (let neighbor of neighbors) {
            let distance = Vec2.distance = Vec2.distance(currentPosition, neighbo.position)

            if(distance < this.separationRadius) {
                let pushvector = new Vec2

                if (distance === 0) {
                    pushvector.set(math.randomrange(-0.1,0.1), math.randomRange(-0.1,0.1))
                }
                else{
                    Vec2.subtract(pushvector, currentPosition, neighbor.postition)
                    pushvector.normalize()
                    let strength = 1.0 - (distance/ this.separationRadius)
                    pushvector.multiplyScalar(strength)
                }
                separationForce.add(pushVector)
                pushCount++
            }
            if(pushCount > 0) {
                separationForce.multiplyScalar(1.0/pushCount)
            }
            return separationForce
        }
    }

    
    }
    getDesiredVelocity(currentPosition: Vec2, targetPosition?: Readonly<Vec2>): Vec2 {
        throw new Error("Method not implemented.");
    }
}


