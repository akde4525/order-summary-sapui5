sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter"
], (Controller, JSONModel, Filter, Sorter) => {
    "use strict";

    return Controller.extend("ordersummary.controller.View1", {
        onInit() {
            
        },
        onReadAll: function(){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/Products",{success: function(oData){
                var jModel = new JSONModel({Products: oData.results});
                that.getView().byId("idProducts").setModel(jModel);
            }, error: function(oError){
                console.log(oError);
            }})
        },
        onReadFilter: function(){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            var oFilter = new Filter('Rating', 'EQ', '3');
        
            oModel.read("/Products", {
                filters: [oFilter],
                success: function(oData){
                    var jModel = new JSONModel({ Products: oData.results }); 
                    that.getView().byId("idProducts").setModel(jModel);
                },
                error: function(oError){
                    console.log(oError);
                }
            });
        },
        onReadSorter: function(){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            var oSorter = new Sorter('Price', true);
        
            oModel.read("/Products", {
                sorters: [oSorter],
                success: function(oData){
                    var jModel = new JSONModel({ Products: oData.results }); 
                    that.getView().byId("idProducts").setModel(jModel);
                },
                error: function(oError){
                    console.log(oError);
                }
            });
        },
        onReadParameter: function(){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            
        
            oModel.read("/Products", {
                urlParameters:{$skip:0, $top:4},
                success: function(oData){
                    var jModel = new JSONModel({ Products: oData.results }); 
                    that.getView().byId("idProducts").setModel(jModel);
                },
                error: function(oError){
                    console.log(oError);
                }
            });
        },
        onReadKey: function(){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            
            oModel.read("/Products(2)", {
               
                success: function(oData){
                    var jModel = new JSONModel( {Products: [oData]}); 
                    that.getView().byId("idProducts").setModel(jModel);
                },
                error: function(oError){
                    console.log(oError);
                }
            });
        },
        onEdit: function(oEvent){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);
            if(oEvent.getSource().getText() === "Edit"){
                oEvent.getSource().setText("Submit");
                oEvent.getSource().getParent().getItems()[0].setEditable(true);
            } else {
                oEvent.getSource().setText("Edit");
                oEvent.getSource().getParent().getItems()[0].setEditable(false);
                var oInput = oEvent.getSource().getParent().getItems()[0].getValue();
                var oId = oEvent.getSource().getBindingContext().getProperty("ID");
                oModel.update("/Products("+oId+")",{Rating:oInput},{success: function(oData){
                    that.onReadAll();
                }, error: function(oError){
                    console.log(oError);
                }})
            }
        },
        onDuplicate: function(oEvent){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);
            var oDuplicateData = oEvent.getSource().getBindingContext().getObject();
            oDuplicateData.ID = 100 + oDuplicateData.ID;
            oModel.create("/Products", oDuplicateData, {success: function(oData){
                that.onReadAll();
            }, error: function(oError){
                console.log(oError);
            }})
        },
        onDelete: function(oEvent){
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);
            var oId = oEvent.getSource().getBindingContext().getProperty("ID");
            oModel.remove("/Products("+oId+")",{success: function(oData){
                that.onReadAll();
            }, error: function(oError){
                console.log(oError);
            }})
        }
        
    });
});