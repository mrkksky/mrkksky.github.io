define([], function () {
        return {
            page: 1,
            offset: 20,
            init: function () {
                var that = this;
                $.getJSON("/photo/output.json", function (data) {
                    that.render(that.page, data);

                    that.scroll(data);
                });
            },

            render: function (page, data) {
                var begin = (page - 1) * this.offset;
                var end = page * this.offset;
                if (begin >= data.length) return;
                var html, li = "";
                for (var i = begin; i < end && i < data.length; i++) {
                    li += '<li><div class="img-box">' +
                        '<a class="img-bg" rel="example_group" href="http://oo2yx8si1.bkt.clouddn.com/IMG_20170403_183506%281%29.jpg/' + data[i] + '?raw=true"></a>' +
                        '<img lazy-src="http://oo2yx8si1.bkt.clouddn.com/IMG_20170403_183506%281%29.jpg/' + data[i] + '?imageView2/1/w/300/h/300/q/100&raw=true" />' +
                        '</li>';
                }

                $(".img-box-ul").append(li);
                $(".img-box-ul").lazyload();
                $("a[rel=example_group]").fancybox();
            },

            scroll: function (data) {
                var that = this;
                $(window).scroll(function() {
                    var windowPageYOffset = window.pageYOffset;
                    var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
                    var sensitivity = 0;

                    var offsetTop = $(".instagram").offset().top + $(".instagram").height();

                    if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                        that.render(++that.page, data);
                    }
                })
            }
        }
    })