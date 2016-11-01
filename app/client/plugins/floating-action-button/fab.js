// $ = jQuery;

//http://codepen.io/koenigsegg1/pen/KdmBOe

//     $.fn.extend({
//         chosen: function(options) {
//             if (!AbstractChosen.browser_is_supported()) {
//                 return this;
//             }
//             return this.each(function(input_field) {
//                 var $this, chosen;
//                 $this = $(this);
//                 chosen = $this.data('chosen');
//                 if (options === 'destroy' && chosen) {
//                     chosen.destroy();
//                 } else if (!chosen) {
//                     $this.data('chosen', new Chosen(this, options));
//                 }
//             });
//         }
//     });

// fab = function(container){
// 	$(container).append(`
// 		<nav class="fab">
// 			<a href="http://codepen.io/koenigsegg1" target="_blank" tooltip="Kyle Lavery" class="fab-button"></a>
// 			<a href="#" tooltip="Xavier" class="fab-button"></a>
// 			<a href="#" tooltip="James" class="fab-button"></a>
// 			<a href="#" tooltip="Reminders" class="fab-button"></a>
// 			<a href="#" tooltip="Invite to Inbox" class="fab-button"></a>
// 			<a href="#" tooltip="Compose" class="fab-button">
// 				<span>
// 					<span class="rotate"></span>
// 				</span>
// 			</a>
// 		</nav>
// 	`);
// }
