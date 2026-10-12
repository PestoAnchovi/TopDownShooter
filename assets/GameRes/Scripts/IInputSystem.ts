import { _decorator, Component, Node, Vec2 } from 'cc';

export interface IInputSystem {
    getMoveDirection(): Vec2
    getRotationAngle(): number | null
    
}


