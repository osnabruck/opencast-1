/**
 * Copyright 2009-2011 The Regents of the University of California Licensed
 * under the Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain a
 * copy of the License at
 * 
 * http://www.osedu.org/licenses/ECL-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 */
/*jslint browser: true, nomen: true*/
/*global define, CustomEvent*/
define(['require', 'jquery', 'underscore', 'backbone', 'engage/engage_core', 'engage/engage_model', 'engage/engage_tab_logic'], function (require, $, _, Backbone, EngageCore, EngageModel, EngageTabLogic) {
  //
  'use strict'; // strict mode in all our application
  //
  /*
   * Logic to insert a plugin with name and type to the player in desktop mode
   */
  var insertPluginToDOM = function(processed_template, plugin_type, plugin_name) {
    //id of the DOM element which is used as plugin container
    var container = "";
    //switch plugin type to insert the plugin to the right DOM element and execute custom view code
  	switch (plugin_type) {
  	case "engage_controls":       
  	  $("#engage_controls").html(processed_template);
  	  container = "#engage_controls";
  	  break;
  	case "engage_video":        
  	  $("#engage_video").html(processed_template);
  	  container = "#engage_video";
  	  break;        
  	case "engage_tab":        
  	  var tab_ref = plugin_name.replace(/ /g, "_");
  	  // insert tab navigation line
  	  var tabNavTag = '<li><a href="#engage_' + tab_ref + '_tab">' + plugin_name + '</a></li>';
  	  $("#engage_tab_nav").prepend(tabNavTag);
  	  // insert tab content
  	  var tabTag = '<div class="tab-pane" id="engage_' + tab_ref + '_tab">' + processed_template + '</div>';
  	  $("#engage_tab_content").prepend(tabTag);
  	  container = "#engage_" + tab_ref + "_tab";
  	  break;
  	case "engage_description":
  	  $("#engage_description").html(processed_template);
  	  container = "#engage_description";
  	  break;    
  	case "engage_timeline":
  	  $("#engage_timeline_plugin").html(processed_template);
  	  container = "#engage_timeline_plugin";
    break; 
    default:
    }
    return container;
  }
  
  /*
   * This function is triggered when all plugins are loaded and inserted into the DOM
   */
  var allPluginsLoadedEvent = function(){
    //Add tab sorted tab logic to the view
    EngageTabLogic('tabs', 'engage_tab_nav');
  }
  
  // public functions fo the module
  return {
    insertPlugin : insertPluginToDOM,
    allPluginsLoaded : allPluginsLoadedEvent
  }
});