import express from 'express';

type DispatchFunction = (this: express.Application, req: express.Request, res: express.Response, next: express.NextFunction) => void;

export class ExpressDispatchDecorator {
    static injectDispatchDecorator(wrapper: (dispatch: DispatchFunction) => DispatchFunction) {
        const Route: undefined | { prototype: { dispatch: DispatchFunction } } = Object.getOwnPropertyDescriptor(express, 'Route')?.value;
        const originalDispatch: undefined | DispatchFunction = Route?.prototype?.dispatch;

        if (!Route || !originalDispatch || typeof originalDispatch !== 'function') {
            throw new Error('ExpressGlobalInjector is not compatible with this version of express');
        }

        Route.prototype.dispatch = wrapper(originalDispatch);
    }
}
