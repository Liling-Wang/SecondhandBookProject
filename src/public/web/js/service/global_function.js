/**
 * Created by liling on 7/10/16.
 */

function WarningBox(msg,setting) {
    var boxClass = 'alert alert-warning';
    var iconClass = 'icon-warning-sign';
    setting = setting || {};
    if(!setting.timeout)
        setting.timeout = 10000;
    _BaseBox(boxClass,iconClass,msg,setting);
}

function _BaseBox(boxClass,iconClass,msg,setting) {
    setting = setting || {};
    var box = $('<div>');

    var content = '';
    content += '<button type="button" class="close" data-dismiss="alert"><i class="icon-remove"></i></button>';
    content += '<strong style="position: absolute;"><i class="'+iconClass+'"></i></strong>';
    content += '<span style="display:inline-block;max-width:500px;margin:0px 10px 0px 20px;">';
    content += msg;
    content += '</span>';

    box.html(content);
    $(document).find('body').append(box);

    box.addClass(boxClass);
    box.css({position:'fixed','z-index':9999,display:'none'});
    var rect = GetBoxPosition(box);//left:737, top:133
   // console.log(rect);
    box.css(rect);
    box.fadeIn(500);

    var timeout = 3000;
    if(setting.timeout)
        timeout = setting.timeout;

    box.children('.close').click(function(){
        if(this && this.parentNode) {
            box[0].outerHTML = ''
        }
    });

    if(!setting.stick) {
        if(timeout>0) {
            setTimeout(function(){
                box.fadeOut(1000,function(){
                    if(this.parentNode)
                        this.outerHTML = '';
                });
            },timeout);
        }
    }
}

function GetBoxPosition(dom) {
    return {
        left:($(window).width() - dom.outerWidth())/2,
        top:($(window).height() - dom.outerHeight())/4
    };
}
