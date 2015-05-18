RacesController = RouteController.extend({
    subscriptions: function () {
        // set up the subscriptions for the route and optionally
        // wait on them like this:
        //
        // this.subscribe('item', this.params._id).wait();
        //
        // "Waiting" on a subscription does not block. Instead,
        // the subscription handle is added to a reactive list
        // and when all items in this list are ready, this.ready()
        // returns true in any of your route functions.
    },

    data: function () {
        // return a global data context like this:
        // Items.findOne({_id: this.params._id});
    },

    action: function () {
        // You can create as many action functions as you'd like.
        // This is the primary function for running your route.
        // Usually it just renders a template to a page. But it
        // might also perform some conditional logic. Override
        // the data context by providing it as an option in the
        // last parameter.
        this.render('Races', {/* data: {} */});
    },
    POST: function () {
        var req = this.request;
        var res = this.response;
        var json = req.body;

        try {
            check(json, {
                _id: String,
                username: String,
                title: String,
                description: String
            });

            Races.insert(json, function (err, result) {
                if(err){
                    throw "insert operation failed"
                } else {
                    console.log(result);
                    res.writeHead(200);
                    res.end(JSON.stringify(json));
                }
            })
        }
        catch (e) {
            console.log(e);
            res.writeHead(400);
            res.end(e.message);
        }
    }
});
