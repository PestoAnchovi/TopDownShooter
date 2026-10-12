import { _decorator, Component, Label, Node, Vec2 } from 'cc';
import { SeekBehavior } from './SeekBehavior';
import { IInputSystem } from './IInputSystem';
import { WanderBehavior } from './WanderBehavior';
import { IState } from './IState';
import { PatrolState } from './PatrolState';
import { ArrivedState } from './ArrivedState';
import { ChaseState } from './ChaseState';
import { LostPlayerState } from './LostPlayerState';
import { StuckScript } from './StuckScript';
import { FleeBehavior } from './FleeBehavior';
import { IntentConfig } from './EnemyConfig';
import { IntentSteeringBehavior } from './IntentSteeringBehavior';
const { ccclass, property } = _decorator;

@ccclass('EnemyInputSystem')
export class EnemyInputSystem extends Component implements IInputSystem {

@property ({ type: Label })
public stateDebugLabel: Label | null = null

    public seek: SeekBehavior = new SeekBehavior()
    public targetNode: Node | null = null

    public wander: WanderBehavior = new WanderBehavior()
    public flee: FleeBehavior = new FleeBehavior()
    public compositeIntent: IntentSteeringBehavior = new IntentSteeringBehavior()

    public patrolState: PatrolState = new PatrolState()
    public arrivedState: ArrivedState = new ArrivedState()
    public chaseState: ChaseState = new ChaseState()
    public lostPlayerState: LostPlayerState = new LostPlayerState()

    public spotPlayerDistance: number
    public losePlayerDistance: number
    private lastTargetPos: Vec2 = new Vec2
    private targetVelocity: Vec2 = new Vec2

    public stuckState: StuckScript = new StuckScript()

    private currentState: IState | null = null
    private currentMoveDir: Vec2 = new Vec2

    public _isMovingSlowly: boolean
    public get isMovingSlowly(): boolean {
        return this._isMovingSlowly;
    }

    public initialize(targetNode: Node, wayPoints: Vec2[], intentConfig: IntentConfig) {
        this.targetNode = targetNode
        this.wander.init(wayPoints, intentConfig)
        this.compositeIntent.setWeights(intentConfig)
        this.spotPlayerDistance = intentConfig.spotPlayerDistance
        this.losePlayerDistance = intentConfig.lostPlayerDistance

        this.changeState(this.patrolState)
    }

    public changeState(newState:IState) {
        if (this.currentState && this.currentState != newState) {
            this.currentState.exit(this)
        }
        if (this.currentState != newState) {
            this.currentState = newState
            this.currentState.enter(this)

            if (this.stateDebugLabel) {
                this.stateDebugLabel.string = newState.constructor.name
            }
        }
    }

    public processFSM(dt: number) {

        if (this.targetNode){
            let currentTargetPos = new Vec2(this.targetNode.worldPosition.x, this.targetNode.worldPosition.y)
            Vec2.subtract(this.targetVelocity, currentTargetPos, this.lastTargetPos)

            this.targetVelocity.multiplyScalar(1/dt)
            this.lastTargetPos = currentTargetPos
        }

        if (this.currentState){
            this.currentState.execute(this, dt)
        }

    }

    public setMoveDirection(dir: Vec2){
        this.currentMoveDir = dir
    }

    public getMoveDirection(): Vec2 {
        return this.currentMoveDir
    }

    public getRotationAngle(): number {
        return null
    }

    public getDistanceToPlayer(myPos: Vec2): number {
        if(!this.targetNode) return Infinity

        let playerPos = this.getPlayerPos()
        return Vec2.distance(myPos, playerPos)
    }

    public getPlayerPos(): Vec2 {
        return new Vec2(this.targetNode.worldPosition.x, this.targetNode.worldPosition.y)
    }

    public getTargetVelocity(): Vec2 {
        return this.targetVelocity
    }
}


