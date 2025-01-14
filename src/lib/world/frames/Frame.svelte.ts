import { Euler, Vector3 } from 'three';

interface Transform {
    position: Vector3;
    rotation: Euler;
}

export class TextOptions {
    value: string = $state('A trip with the boat ..');
    position: Vector3 = $state(new Vector3(0, 9.2, 3.4)); 
    rotation: Euler = $state(new Euler(0, 0, 0));
    size: number = $state(0.2);

    opacity: number = $state(0);
    bevelEnabled: boolean = $state(true);
    bevelOffset: number = $state(0);
    bevelSegments: number = $state(20);
    bevelSize: number = $state(0.2);
    bevelThickness: number = $state(0.1);
    curveSegments: number = $state(12);
    height: number = $state(1);
    smooth: number = $state(0.1);
    
    constructor(textOptions?: Partial<TextOptions>) {
        Object.assign(this, textOptions);
    }
}

export class Frame {
    public camera: Transform = $state({
        position: new Vector3(0, 0, 0),
        rotation: new Euler(0, 0, 0)
    });
    public text: TextOptions = $state(new TextOptions());
    public scrollTrigger: boolean = $state(false);

    constructor(frameOptions?: Partial<Frame>) {
        Object.assign(this, frameOptions); 
    }
}