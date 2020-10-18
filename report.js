// Putting the pieces together.
import {en_list,en2} from './data'

var custom_renderers = {
	"Multifact Table": multifactTableRenderer()
};

var custom_aggregators = {
	"Multifact aggregator": multifactSumAggregator()
};


$("#declarations_report #pivottable").pivotUI(en_list, {
	aggregators: $.extend(custom_aggregators, $.pivotUtilities.aggregators),
	renderers: $.extend(custom_renderers, $.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers),
	rows: ["person"],
	cols: ["company"],
	vals: ["hours", "turnover", "profit_margin"],
	hiddenAttributes: ["id"]
});
