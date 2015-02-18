/**
 * @module ui/storage-panel.reel
 * @requires montage/ui/montage
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class StoragePanel
 * @extends Component
 * A Storagepanel composes of local cached data, the cached data is displayed in a hierarchical tree
 * tree structure, each tree node serves as a discrete button which will expand/contract depending on
 * its current status. The nodes will display the current data & metadata from the cache. Each tree node
 * will also have a delete and a refresh button associated with it. The delete button serves to remove the 
 * tree node, the refresh button currently pushes an element to a queue to be processed by montage-data.   
 */
exports.StoragePanel = Component.specialize(/** @lends StoragePanel# */ {
    constructor: {
        value: function StoragePanel() {
            this.super();
        }
    },

    /**
    * Accepts an array that gets added to a queue of items to be processed by montage-data
    * @type Array
    */    
    refreshQueue: {
    	value: []
    },

    /**
    * Cache contains a set of entries, each entry has a set of subentries which contains
    * data and metadata. Getter/setter function to retrieve the data from cache.  
    */    
    cache:{
    	set:function(value){
    		this._cache = value;
    	},
    	get:function(){
    		return this._cache;
    	}
    },

    /**
    * Alternates the tree iteration object to toggle between expanded and contracted.
    */
    handleTreenodeAction: {
        value: function (event) {
            event.target.iterationObject.expanded = !event.target.iterationObject.expanded;
        }
    },

    /**
    * Delete the current tree iterationObject
    */
    handleDeleteDataAction: {
        value: function (event) {

            if (this.templateObjects.treeController.content == event._currentTarget.iterationObject.content){
                this.templateObjects.treeController.content = null;
            }   

            var child = event.target.iterationObject, 
                children = child.parent.content.subentries,
                index = children.indexOf(child.content);

            if (index !== -1) {
                children.splice(index,1);
            }            
        }
    },

    /**
    * Checks to see if item is already in queue, then pushes the current iteration to an the queue to be refreshed. 
    */

    handleRefreshDataAction: {
    	value: function(event){
            if (this.refreshQueue.indexOf(event.currentTarget.iterationObject.content) == -1){
    		  this.refreshQueue.push(event.currentTarget.iterationObject.content);
            }
    	}
    }
});


//this._pressComposer = new PressComposer()
//this.addComposerForElement(this._pressComposer,element);
//enterDocument

//this._pressComposer.addEventListener("press",handle, false)
//prepareforActivationEvents

