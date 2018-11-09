import Component from '@ember/component';

export default Component.extend({
    overflowing: false,
    didInsertElement:function(){
        let offsetWidth = this.$()[0].offsetWidth;
        let scrollWidth = this.$()[0].scrollWidth;
        if(scrollWidth > offsetWidth){
            this.set('overflowing',true);
        }
    },
});
