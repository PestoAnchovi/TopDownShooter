import { _decorator, Component, Node, Vec2 } from 'cc';
import { IState } from "./IState"
import { EnemyInputSystem } from './EnemyInputSystem';


export class PatrolState implements IState {

    private stuckTimer: number = 0
    private stuckThresholdTime: 0.5

    enter(brain: EnemyInputSystem): void {
        this.stuckTimer = 0
    }
    execute(brain: EnemyInputSystem, dt: number): void {
        let myPos = new Vec2(brain.node.worldPosition.x,brain.node.worldPosition.y)

        if (brain.getDistanceToPlayer(myPos) < brain.spotPlayerDistance) {
            brain.changeState(brain.chaseState)
            return
        }

        if (brain.wander.hasArrived(myPos)) {
            brain.wander.pickNewWanderPoint()
            brain.changeState(brain.arrivedState)
            return
        }
        let dir = brain.wander.getDesiredVelocity(myPos)
        brain.setMoveDirection(dir)
    }
    exit(brain: EnemyInputSystem): void {
        
    }
}


