(function ($) {

    $.fn.siteTour = function (options) {

        // Establish our default settings
        var settings = $.extend({
            scrollPage: false,
            nextButton: "",
            previousButton: "",
            closeButton: "",
            doneButton: "", // the text appearing in the close button
            complete: function(){}
        }, options);

        return this.each(function () {
            // not implemented
//            if ($.isFunction(settings.complete)) {
//                settings.complete.call(this);
//            }


            // define stepCounter
            var stepCounter = 0;

            // get number of steps
            var numberOfSteps = $("*[step-no]").length;

			
            $(this).click(function () {
                initializePageTour();
            });

            $('body').on('click', 'div#nextButton', function () {
                nextStep();
            });

            // control movements back and forwards with the keyboard
            $(document.documentElement).keyup(function (e) {
                // if next button on the keyboard is clicked
                if (e.keyCode == 39) {
                    nextStep();
                }
                // if back button on the keyboard is clicked
                if (e.keyCode == 37) {
                    previousStep();
                }
                // if esc button on the keyboard is clicked exit the plugin
                if(e.keyCode == 27){
                    endPageTour();
                }

            });

			// implement "previousStep" function when clicking on the backwards element
            $('body').on('click', 'div#backButton', function () {
                previousStep();
            });

			// implement "endPageTour" function on selected elements when clicked on
            $('body').on('click', 'div#doneButton,div#cancelButton,.page-tour-overlay', function () {
                endPageTour();
            });

			// base function to start with
            function initializePageTour() {
				// let's place a page overlay div to shade the page
                $('body').append("<div class=\"page-tour-overlay\"></div>");
                // create a highlight box which is placed under the element to be highlighted
                $('body').append("<div class=\"page-tour-highlighter\"></div>");
                // append controls textbox with text and position it under highglihter
                $('body').append("<div class=\"page-tour-textbox\"></div>");
                stepCounter++;
                goToStep(stepCounter);
            }

            // function that creates highlight with text on the selected step
            function goToStep(stepNumber) {
			    // get current step element
                var currentStep = $("*[step-no='" + stepNumber + "']");
				// get the position of the text box to be displayed - left, right, bottom, top
                var textboxPosition = currentStep.attr("data-position");
				// get current step text which will be displayed in the text box
                var currentStepText = currentStep.attr("data-text");
				
				// get custom height to be set to the highlighter
                var customHeight = currentStep.attr("data-custom-height");
				// get highlighter
                var highlighter = $(".page-tour-highlighter");

				
                var heighlighterHeight;
				// check if there's a custom height defined for the highlighter,
				// else set "heighlighterHeight" height to reflect current step height
                if (customHeight) {
                    heighlighterHeight = customHeight;
                } else {
                    heighlighterHeight = currentStep.outerHeight();
                }
				
                // if this is the first step set some css attributes and then animate the box, 
				// else animate box dimensions and position to the current selected element
                if (stepNumber == 1) {
				highlighter.css({
						position: "absolute",
                        left: currentStep.offset().left + "px",
                        top: currentStep.offset().top + "px"
						}).animate({
                        width: currentStep.outerWidth() + "px",
                        height: heighlighterHeight + "px",
                        marginLeft: "-" + highlighter.css("padding-left"),
                        marginTop: "-" + highlighter.css("padding-top")
                    }, 200);
                } else {
                    highlighter.animate({
                        left: currentStep.offset().left + "px",
                        top: currentStep.offset().top + "px",
                        width: currentStep.outerWidth() + "px",
                        height: currentStep.outerHeight() + "px"
                    }, 200);
                }


                // bring current step in front of the highlighter
                currentStep.css({
                    position: "relative",
                    "z-index": "99998"
                });

                // show the textbox with text and navigation buttons
                var textbox = $(".page-tour-textbox");

                // into the textbox append text and buttons div placeholder
                textbox.html("<div class=\"textbox-inner\">" + currentStepText + "</div><div class=\"textbox-buttons\"></div>");

                // append control buttons in to the buttons div placeholder
                $("<div id=\"backButton\" class=\"button-link\"><div class=\"textbox-buttons-text\">"+settings.previousButton+"</div></div>").appendTo(".textbox-buttons");
                $("<div id=\"nextButton\" class=\"button-link\"><div class=\"textbox-buttons-text\">"+settings.nextButton+"</div></div>").appendTo(".textbox-buttons");
                $("<div id=\"cancelButton\" class=\"button-link cancel\"><div class=\"textbox-buttons-text\">"+settings.closeButton+"</div></div>").appendTo(".textbox-buttons");



                
                
                // show the textbox with the related text and navigation buttons
                textbox.delay(200).fadeIn().css({
                    position: "absolute",
                });

                // if "data-position" attribute is specified set the textbox according to the command
                switch (textboxPosition) {
                    case "top":
                        textbox.css({
                            left: currentStep.offset().left + "px",
                            top: currentStep.offset().top - textbox.outerHeight() - 30  + "px"
                        });
                        break;
                    case "bottom":
                        textbox.css({
                            left: currentStep.offset().left + "px",
                            top: currentStep.offset().top + currentStep.outerHeight() + 10 +heighlighterHeight+ "px"
                        });
                    case "left":
                        textbox.css({
                            left: currentStep.offset().left - textbox.outerWidth() -20+ "px",
                            top: currentStep.offset().top + "px"
                        });
                        break;
                    case "right":
                        textbox.css({
                            left: currentStep.offset().left + currentStep.outerWidth() + 20 + "px",
                            top: currentStep.offset().top + "px"
                        });
                        break;
                    default:
                        // by default, place it under the content
                        textbox.css({
                            left: currentStep.offset().left + "px",
                            top: currentStep.offset().top + currentStep.outerHeight() + 20 + "px"
                        });
                        break;
                }


                // check if this is the last step and remove the next button and add close button
                if (stepCounter == numberOfSteps) {
                    // remove the next button
                    $("div#nextButton,div#cancelButton").remove();
                    // add done button to close the function
                    $("<div id=\"doneButton\" class=\"button-link\"><div class=\"textbox-buttons-text\">"+settings.doneButton+"</div></div>").appendTo(".textbox-buttons");
                }


                // check if this is first step and remove back button as there's nothing to go back to
                if (stepCounter == 1) {
                    $("div#backButton").remove();
                }

                if (settings.scrollPage) {
                    var elementsOnScreen = textbox.isOnScreen() && currentStep.isOnScreen();
                    if (!elementsOnScreen) {
                        $('html, body').animate({
                            scrollTop: currentStep.offset().top - currentStep.outerHeight()
                        }, 500);
                    }
                }

                // for any sibling element of the current step remove z-index. This will push back any element that might have been already exposed with the highlight
                currentStep.siblings().each(function () {
                    $(this).css({
                        "z-index": ""
                    });
                });


                // calculate the height of a single button in a textbox in order to fill the div from top to bottom
                var numberOfButtons = $(".textbox-buttons").children().length;
                $(".button-link").css("height",textbox.height()/numberOfButtons);


            }

            // function to go to the next step
            function nextStep() {
                // allow next step if current step is not the last one, or step counter is different than 0
                if (stepCounter < numberOfSteps && stepCounter !== 0) {
                    var textbox = $(".page-tour-textbox").hide();
                    stepCounter++;
                    goToStep(stepCounter);
                } else {
                    // otherwise finish the page tour
                    endPageTour();
                }
            }

            // function to go to the previous step
            function previousStep() {
                if (stepCounter > 1) {
                    var textbox = $(".page-tour-textbox").hide();
                    stepCounter--;
                    goToStep(stepCounter);
                }
            }

            // function to end the site tour
            function endPageTour() {
                $(".page-tour-overlay,.page-tour-textbox,.page-tour-highlighter,*[clone_id]").remove();
                stepCounter = 0;
                settings.complete;
            }

            // check if the element is on the screen
            $.fn.isOnScreen = function () {
                var win = $(window);

                var viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                };
                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();

                var bounds = this.offset();
                bounds.right = bounds.left + this.outerWidth();
                bounds.bottom = bounds.top + this.outerHeight();

                return (bounds.bottom < viewport.bottom && bounds.right < viewport.right && bounds.top > viewport.top);
            };
        });
    };

} (jQuery, window));