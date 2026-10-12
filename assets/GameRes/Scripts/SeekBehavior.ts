import { _decorator, Component, Node, Vec2 } from 'cc';
import { ISteeringBehavior } from './ISteeringBehavior';
const { ccclass, property } = _decorator;

export class SeekBehavior implements ISteeringBehavior {
    getDesiredVelocity(currentPosition: Vec2, targetPosition?: Readonly<Vec2>): Vec2 {
        let desiredDir = new Vec2
        Vec2.subtract(desiredDir, targetPosition, currentPosition)
        return desiredDir.normalize()
}
}


