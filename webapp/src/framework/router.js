import viewport from './viewport';
import transition from './transition';
import config from './config';

const router = {
    /**
     * start router
     */
	start: function(routers) {
        const AppRouter = Backbone.Router.extend({

            ...routers,

            nav(path, params, animation, trigger) {
                if (trigger === undefined) {
                    trigger = true;
                }

				params = params || {};
				params.__animation__ = animation || transition.defaultAnimation;
				this.params = params;

                this.navigate(path, {trigger: trigger});
            }
        });

        this.appRouter = new AppRouter();
        // HTML5 push state
        Backbone.history.start({pushState: config.pushState, root: '/'});
        // Backbone.history.start();

        return this;
    },

    /**
     * router navigation
     */
    nav(path, params, animation, trigger) {
        this.appRouter.nav(path, params, animation, trigger);
    },

    /**
     * transmit view
     */
    fly(view, params) {
        // merge params
        params = params || {};
        Object.assign(params, this.appRouter.params || {});

        viewport.fly(view, params);
        this.appRouter.params = null;
    }
};

export default router;
