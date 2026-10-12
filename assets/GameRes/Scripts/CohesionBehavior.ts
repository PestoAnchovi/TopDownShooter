import { _decorator, Component, math, Node, Vec2 } from 'cc';
import { ISteeringBehavior } from './ISteeringBehavior';
import { EnemyMovementSystem } from './EnemyMovementSystem';



export class CohesionBehavior implements ISteeringBehavior {

    private brain: EnemyMovementSystem
    private CohesionRadius: number

    constructor(enemyMovementSystem: EnemyMovementSystem, CohesionRadius: number) {
        this.brain = enemyMovementSystem
        this.CohesionRadius = CohesionRadius
    }

    getDesiredVelocity(currentPosition: math.Vec2, targetPosition?: Readonly<math.Vec2>): math.Vec2 {
        let neighbors = this.brain.getNeighborData()
        let CohesionForce = new Vec2

        if (neighbors.length === 0) return CohesionForce

        let averageVelocity = new Vec2
        let neighborCount = 0

        for (let neighbor of neighbors) {
            let distance = Vec2.distance(currentPosition, neighbor.position)

            if (distance < this.CohesionRadius) {
                averageVelocity.add(neighbor.velocity)
                neighborCount++

            }
        }
        if (neighborCount === 0) return CohesionForce

        averageVelocity.multiplyScalar(1.0/neighborCount)
        if(averageVelocity.lengthSqr() > 0) {
            averageVelocity.normalize()
            CohesionForce = averageVelocity
        }
        return CohesionForce
    }
}
    


