var Events = {
    events:{},
    on: function(name, callback){
        var that = this;
        if(typeof this.events[name] == 'undefined'){
            this.events[name] = []
            this.events[name].push(callback)
        }else{
            this.events[name].push(callback)
        }
        return function(){
            that.events[name] = that.events[name].filter(c => c !==callback);
        }
    },
    emit: function(name, obj){
        if(typeof obj=='undefined' || !obj){
            obj = null;
        }
        if(typeof this.events[name] == 'object'){
            //we have some options
            for(var i=0; i<Object.keys(this.events[name]).length; i++){
                var key = Object.keys(this.events[name])[i];
                if(typeof this.events[name][key] == 'function'){
                    this.events[name][key](obj);
                }   
            }
        }
    }
}

module.exports = Events