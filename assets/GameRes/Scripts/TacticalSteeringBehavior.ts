import { math, Vec2 } from "cc";
import { ISteeringBehavior } from "./ISteeringBehavior";
import { MovementConfig } from "./EnemyConfig";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { SeperationBehavior } from "./SeperationBehavior";
import { AllignmentBehavior } from "./AllignmentBehavior";
import { CohesionBehavior } from "./CohesionBehavior";

export class TacticalSteeringBehavior implements ISteeringBehavior {

    private movementConfig: MovementConfig
    private currentHitNormals: Vec2[] = []
    private brain: EnemyMovementSystem
    private avoidBehavior: AvoidBehavior
    private separationBehavior: SeperationBehavior
    private alignmentBehavior: AllignmentBehavior
    private CohesionBehavior: CohesionBehavior

    constructor(movementConfig: MovementConfig, EnemyMovementSystem: EnemyMovementSystem) {
        this.movementConfig = movementConfig
        this.brain = EnemyMovementSystem
        this.avoidBehavior = new AvoidBehavior(EnemyMovementSystem, movementConfig.whiskers)
        this.separationBehavior = new SeperationBehavior(EnemyMovementSystem, movementConfig.flocking.seperationRadius)
        this.alignmentBehavior = new AllignmentBehavior(EnemyMovementSystem, movementConfig.flocking.alignmentRadius)
    }
    getDesiredVelocity(currentPosition: Vec2, targetPosition?: Readonly<Vec2>): math.Vec2 {
        
        let totalTacticalForce = new Vec2

        if (this.movementConfigConfig.avoidWeight > 0) {
            let avoidFoce = this.avoidBehavior.getDesiredVelocity(currentPosition)

            avoidForce.multiplyScalar(this.movementConfig.avoidWeight)
            totalTacticalForce.add(avoidForce)
        }

        if (this.movementConfig.flocking.seperationWeight > 0) {
            let separationForce = this.separationBehavior.getDesiredVelocity(currentPosition)
            separationForce.multipleScalar(this.movementConfig.flocking.seperationWeight)
            totalTacticalForce.add(separationForce)
        }

        if (this.movementConfig.flocking.alignmentWeight > 0) {
            let salignmentForce = this.alignmentBehavior.getDesiredVelocity(currentPosition)
            alignmentForce.multipleScalar(this.movementConfig.flocking.seperationWeight)
            totalTacticalForce.add(alignmentForce)
        }

        if (this.movementConfig.flocking.cohesionWeight > 0) {
            let salignmentForce = this.CohesionBehavior.getDesiredVelocity(currentPosition)
            CohesionForce.multipleScalar(this.movementConfig.flocking.seperationWeight)
            totalTacticalForce.add(CohesionForce)
        }
    }
}

