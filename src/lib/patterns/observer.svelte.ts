export interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

export class Subject {
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log(`${this.constructor.name}: The ${observer.constructor.name} has been attached already.`);
        }

        console.log(`${this.constructor.name}: Attached the observer ${observer.constructor.name}.`);
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log(`${this.constructor.name}: Nonexistent observer ${observer.constructor.name}.`);
        }

        this.observers.splice(observerIndex, 1);
        console.log(`${this.constructor.name}: Detached the observer ${observer.constructor.name}.`);
    }

    public notify(): void {
        if (!this.observers?.length) {
            return;
        }
        console.log(`${this.constructor.name}: Notifying the observers: ${this.observers.map(observer => observer.constructor.name)}`);
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

export interface Observer {
    // Receive update from subject.
    update(subject: Subject): void;
}