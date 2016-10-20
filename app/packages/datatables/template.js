Template.ReactiveDatatable.rendered = function() {
    var data = this.data;

    if (typeof data.tableData !== "function") {
        throw new Meteor.Error('Your tableData must be a function that returns an array via Cursor.fetch(), .map() or another (hopefully reactive) means')
    }


    var defaultOptions = {
        searchHighlight: true,
        tableClasses: 'table table-striped table-bordered table-hover',
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{
            extend: 'copy',
            text: '<i class="fa fa-files-o datatable-btn-copy" aria-hidden="true"></i>'
        },{
            extend: 'csv',
            text: '<i class="fa fa-file-excel-o datatable-btn-csv" aria-hidden="true"></i>'
        },{
            extend: 'print',
            text: '<i class="fa fa-print datatable-btn-print" aria-hidden="true"></i>',
            customize: function (win){
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }],
        infoCallback: function(settings, start, end, max, total, pre) {
            var str = settings.oLanguage.sInfo
                .replace('_START_', start)
                .replace('_END_', end)
                .replace('_TOTAL_', total);
            $('#table-footer').html(str);
        },
        // fnDrawCallback: function(settings, json) { #TODO: editar direto na tabela
        //  $('.js-switch').each(function(index, element) {
        //      if(!$(element).data('switchery')) {
        //          var switchery = new Switchery(element, {
        //              size: 'small',
        //              color: '#2C8F7B',
        //              secondaryColor: '#ED5565'
        //          });
        //      }
        //  });
        // },
    };
    var options = data.useDefaults ? _.extend(defaultOptions, data.options) : data.options;

    var reactiveDataTable = new ReactiveDatatable(options);

    // Help Blaze cleanly remove entire datatable when changing template / route by
    // wrapping table in existing element (#datatable_wrap) defined in the template.
    var table = document.createElement('table');
    if(data.id){
        table.id = data.id;
    }
    var tableClasses = options.tableClasses || "";
    table.className = 'table dataTable ' + tableClasses;
    
    // Render the table element and turn it into a DataTable
    this.$('.table-responsive').append(table);
    var dt = $(table).DataTable(options);
    reactiveDataTable.datatable = dt;

    dt.on('page.dt', function(e, settings) {
        var info = dt.page.info();
        reactiveDataTable.page = info.page;
    });

    Template.parentData().dataTable = dt;

    $(table).on( 'draw.dt', function () {
         $('.datatable-btn-copy').parent().parent().attr('title', TAPi18n.__('common_copy'));
        $('.datatable-btn-csv').parent().parent().attr('title', TAPi18n.__('common_csv'));
        $('.datatable-btn-print').parent().parent().attr('title', TAPi18n.__('common_print'));
    } );

    this.autorun(function() {
        reactiveDataTable.update(data.tableData());
    });
};
