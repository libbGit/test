/*!
 * @description pagechoice motu_domain
 * @revise  artecfeng
 * @version  1.0.0.01
 * @to  yichepc
 * @now yiche
 * @changedate 2019-02-25
 * @changelog 更改css 表单样式
 */

/**
 * 用于将js文件，通过<script src="url">的方式加载到页面
 */
(function(window, undefined) {
  "use strict";

  let $jquery; //防止与其他框架的$符号冲突，所以起个别名

  //在开发中修改此处即可 start
  const env = {
    mode: "development", //是开发模式还是生产模式 development | production | test
    href: "http://html.bizhiquan.com//article_120098.html?ad=yes&channelCode=samsung",
    domain: "html.bizhiquan.com"
  };
  //在开发中修改此处即可 end

  const GLOBAL_DATA = {
    mt_url: env.mode != "production" ? "http://171.84.4.137:8081/mt" : "https://pagechoicemotu.gentags.net/mt", //171为测试环境接口，pagechoicemotu为生茶环境接口
    jquery_url: "https://images.pagechoice.net/data/athena/js/jquery-1.9.0.js",
    zepto_url: "https://images.pagechoice.net/data/athena/js/zepto.min.js",
    // touch_url: "https://images.pagechoice.net/data/athena/js/touch.js",
    oridomi_url: "https://images.pagechoice.net/data/athena/js/oridomi.min.js", // 用于 折叠
    turn_url: "https://images.pagechoice.net/data/athena/js/turn.js", //用于撕角
    es6_url: "https://images.pagechoice.net/data/athena/js/polyfill.js",
    vue_url: "https://images.pagechoice.net/data/athena/js/vue.js",
    href: env.mode != "development" ? window.location.href : env.href, //在生产环境上，都是通过真实的url来判断媒体的
    domain: env.mode != "development" ? document.domain : env.domain
  };

  function start() {
    loadMoreJs();
  }

  async function loadMoreJs() {
    await loadJs(GLOBAL_DATA.jquery_url);
    await loadJs(GLOBAL_DATA.zepto_url);
    // await loadJs(GLOBAL_DATA.touch_url);
    await loadJs(GLOBAL_DATA.oridomi_url);
    await loadJs(GLOBAL_DATA.turn_url);
    await loadJs(GLOBAL_DATA.es6_url);
    await loadJs(GLOBAL_DATA.vue_url);

    $jquery = jQuery.noConflict();

    fetch_Mt_Data();
  }

  function loadJs(url) {
    return new Promise((resolved, reject) => {
      let head = document.getElementsByTagName("head")[0];
      let script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", url);
      head.appendChild(script);

      script.onload = script.onreadystatechange = () => {
        resolved();
      };
    });
  }

  function loadMotuCss(url) {
    if (url[0].charAt(url[0].length - 1) == ";") {
      url = url[0].substr(0, url[0].length - 1);
    }
    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    head.appendChild(link);
  }

  function getFirstImg(pointId) {
    //非隐藏的首张图判断
    let imgs = $jquery(pointId);
    let img_list = [];
    for (let i = 0; i < imgs.length; i++) {
      let img = $jquery(imgs[i]);

      if (img.css("display") != "none" && img.width() != 0 && img.parents("ins").length == 0) {
        img_list.push(imgs[i]);
      }
    }

    let yt_img = null;
    if (img_list.length != 0) {
      yt_img = $jquery(img_list[0]);
    }
    return yt_img;
  }

  /**
   * 从后端接口获取 数据，根据数据来判断如何展示魔图形式
   */

  
  function fetch_Mt_Data() {
    let href = GLOBAL_DATA.href;
    let param = JSON.stringify({ href: href });

    console.log("fetch_Mt_Data=", href);

    if(GLOBAL_DATA.domain.indexOf("bizhiquan")){  //视觉中国 锁屏
      let pageKind = $jquery(".summary").html().trim();
      param = JSON.stringify({ href: href, kind: pageKind });
    }

    $jquery.ajax({
      type: "post",
      url: GLOBAL_DATA.mt_url,
      timeout: 5000000,
      dataType: "json",
      data: param,
      async: true,
      crossDomain: true, //保留cookie
      success: data => {
        data = {
          data: {
            active: 1,
            adsense: [
              {
                cvCode:
                  "https://pctracking.gentags.net/mtc?projectId=63&planId=1552442354304&zoneId=142&mediaId=27&formatId=74&creativeId=339&cType=ad&cPosition=1",
                ext: "",
                form_svCode:
                  "https://pctracking.gentags.net/mtc?projectId=63&planId=1552442354304&zoneId=142&mediaId=27&formatId=74&creativeId=339&cType=sbm&cPosition=1",
                fromUrl: "https://images.pagechoice.net/data/fordring/creative/20190301/1551412828320.html",
                landingUrl:
                  "http://www.bmw.com.cn/zh/index.html?bmw=sea:baidu:brand:p_bzonep_18-all-lt-bd-bz_wh_bz_tw&mz_ca=2074779&mz_sp=7DhI8&mz_kw=8719614",
                logoImg_pvCode:
                  "https://pctracking.gentags.net/mtv?projectId=63&planId=1552442354304&zoneId=142&mediaId=27&formatId=74&creativeId=339&cType=logo&cPosition=1",
                logo_img_src: "https://images.pagechoice.net/data/fordring/creative/20190301/1551412752130.png",
                positionId: 1,
                pvCode:
                  "https://pctracking.gentags.net/mtv?projectId=63&planId=1552442354304&zoneId=142&mediaId=27&formatId=74&creativeId=339&cType=ad&cPosition=1",
                urlB: "https://images.pagechoice.net/data/fordring/creative/20190301/1551412783332.gif"
              }
            ],
            closeCvCode:
              "https://pctracking.gentags.net/mtc?projectId=63&planId=1552442354304&zoneId=142&mediaId=27&formatId=74&creativeId=339&cType=cls&cPosition=1",
            creativeId: 339,
            csss: ["./suoping_files/tear-angle.css;"],
            customerId: 42,
            formSubmitUrl: "http://mt.gentags.net/creative/add.do",
            jss: ["https://images.pagechoice.net/data/athena/js/turn.js;"],
            mediaId: 27,
            planId: 396,
            pointId: ".motu",
            positionMark: 1,
            terminal: "wap",
            type: 13,
            zoneId: 142
          },
          message: "OK",
          state: 200
        };
        
        let option = data.data;
        if (data.state == 200 && data.data) {
          option = data.data;

          //加载motu效果css

          // if (env.mode != "development") {
            loadMotuCss(option.csss);
          // }

          console.log("option", option);
          validateImage(option);
        } else {
          //如果返回数据为空，则为了让后台能知道发生了什么事，前端需要向后端发送 “邮件” 请求，由后端发送邮件
          console.error("*****************返回数据为空！*********************");
          let Models = "";
          if (GLOBAL_DATA.domain.indexOf("bitauto") > 0) {
            //易车
            Models =
              GLOBAL_DATA.href.substr(7).split(".")[0] == "news"
                ? $(".h6")
                    .children("a")
                    .attr("href")
                    .split("/")[3]
                : "'" + $("#hfCarLevel").val() + "'";
          } else {
            Models = GLOBAL_DATA.domain;
          }

          let mt_media = GLOBAL_DATA.href.substr(7).split(".")[1];
          let data_Res = data.state;
          let url = "'" + GLOBAL_DATA.href + "'";
          console.log(
            "models:  " + Models + ",    mt_media:  " + mt_media + ",    data_res:  " + data_Res + ",   url:" + url
          );
          $jquery.ajax({
            type: "get",
            url: "http://motu.pagechoice.com:8055/send",
            timeout: 5000000,
            data: { zoneName: Models, mesg: data_Res, media: mt_media, url: url },
            async: true,
            crossDomain: true //保留cookie
          });
        }
      },
      error: (XMLHttpRequest, textStatus, errorThrown) => {
        console.log(XMLHttpRequest, textStatus, errorThrown);
        // console.log("请求失败！");
      }
    });
  }

  /**
   * 验证魔图点位是否符合 规则
   *
   */
  function validateImage(option) {
    let img_width = 0,
      img_height = 0, //获取广告位原图 宽 高
      img_ratio; //获取广告位原图 宽 高 比例

    let screenWidth = 0,
      screenHeight = 0; //当前设备的屏幕宽 高

    let first_img = getFirstImg(option.pointId); //获取广告位原图
    console.log("first_img:" + first_img);

    if (first_img) {
      img_width = first_img.width();
      img_height = first_img.height(); //获取原图：宽高
      img_ratio = img_height / img_width;
    } else {
      console.log("**********************原图为空！pointId为：****************" + option.pointId);
      return;
    }
    console.log("原图宽:", img_width, "原图高:" + img_height);

    //获取当前屏幕尺寸:宽高
    screenWidth = window.screen.availWidth;
    screenHeight = window.screen.availHeight;

    // if (window.orientation === 180 || window.orientation === 0) { //竖屏
    //     if (screenWidth > screenHeight) {
    //         screenWidth = window.screen.availHeight;
    //         screenHeight = window.screen.availWidth;
    //     }
    // }
    // if (window.orientation === 90 || window.orientation === -90) { //横屏
    //     if (screenWidth < screenHeight) {
    //         screenWidth = window.screen.availHeight;
    //         screenHeight = window.screen.availWidth;
    //     }
    // }
    console.log("屏幕宽:" + screenWidth, "屏幕高:", screenHeight);
    //???什么条件
    if (
      first_img &&
      img_width > screenWidth * 0.7 &&
      img_width < screenWidth + 1 &&
      img_height > screenHeight * 0.2 &&
      img_height < screenHeight * 0.7
    ) {
      //动态创建特效布局，并绑定特效
      console.log("符合规则，显示魔图效果！");
      setMotuRootDom(option);
      createVue(
        $jquery.extend({}, option, {
          img_width: img_width,
          img_height: img_height,
          img_ratio: img_ratio,
          first_img: first_img
        })
      );
    } else {
      console.error("***************不符合规则！*******************");
    }
  }

  /**
   * 设置 魔图的根节点和监测 节点
   */
  function setMotuRootDom(data) {
    $jquery("body").append('<div class="motu_monitor"></div>');
    let first_img = getFirstImg(data.pointId); //获取广告位原图
    first_img.css({ margin: "0", display: "block" });
    first_img.parent().css({
      position: "relative",
      display: "inline-block"
    });

    first_img.wrap('<div id="motu-app"></div>');
  }

  /**
   *
   * 创建vue组件
   */
  function createVue(mtData) {
    createTearAngle(mtData);
    createTearFold(mtData);
    /**
        6 撕角展示
        7 撕角交互   
        13 撕角渐变交互   
        14 撕角渐变展示

        8 折页上下展示  
        9 折页左右展示  
        10 折页上下交互  
        11 折页左右交互  
       */
    if (mtData.type == 6 || mtData.type == 7 || mtData.type == 13 || mtData.type == 14) {
      let vm = new Vue({
        render: h => h("motu-tear-angle")
      }).$mount("#motu-app");
    } else if (mtData.type == 8 || mtData.type == 9 || mtData.type == 10 || mtData.type == 11) {
      let vm = new Vue({
        render: h => h("motu-fold")
      }).$mount("#motu-app");
    }
  }

  //创建 折叠 组件
  function createTearFold(mtData) {
    Vue.component("motu-fold", {
      data() {
        return {
          componentData: mtData,
          oriDomi: null,

          geoStores: {},

          img_layout_style: {},
          motu_bottom_style: {}, //底层的广告
          motu_bottom_img_style: {},
          landingUrl: "",
          url: "",
          logo_img_src: "",

          direction: "horizontal", //horizontal  左右折叠，   vertical 上下折叠
          isShowClose: false,

          movementAngle: 0, //折叠时推开的角度
          isShowBottomImage: false, //是否显示底层的魔图
          isShowRightArrow: false,
          isShowUpArrow: false

          //   provinceArr: [],
          //   province_title: "",
          //   provinceValue: "",

          //   cityArr: [],
          //   city_tile: "",
          //   cityValue: "",

          //   hometownArr: [],
          //   hometown_title: "",
          //   hometownValue: "",
        };
      },
      template: `<div class="motu-main" style="position: relative; overflow: hidden;" :style="img_layout_style">
                      <div class="mt_img_layout" :style="img_layout_style" style="position: relative; z-index: 2;">
                          <div class="mt_img_box mt_the_img" @click="gotoLanding(landingUrl,$event)">
                              <div v-html="componentData.first_img.context.outerHTML"></div>
                          </div>
                          <template v-if="isHorizontal">
                              <i class="mt_btn mt_btn_right" v-if="isShowRightArrow"><img src="https://images.pagechoice.net/data/motu_wap/icon_right.gif" style="width:100%;height:auto;min-width:100%"/></i>
                              <i class="mt_btn mt_btn_left" v-else><img src="https://images.pagechoice.net/data/motu_wap/icon_left.gif" style="width:100%;height:auto;min-width:100%"></i>
                          </template>
                          <template v-else>
                              <i class="mt_btn mt_btn_up" v-if="isShowUpArrow"><img src="https://images.pagechoice.net/data/motu_wap/icon_up.gif" style="width:100%;height:auto;min-width:100%"/></i>
                              <i class="mt_btn mt_btn_down" v-else><img src="https://images.pagechoice.net/data/motu_wap/icon_down.gif" style="width:100%;height:auto;min-width:100%"/></i>
                          </template>
                      </div>
                      <div class="mt_adImg_div" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;">
                          <a :href="landingUrl" v-if="isShowBottomImage" class="mt_pd_img" :style="motu_bottom_style" @click="gotoLanding(landingUrl,$event)">
                              <img style="display:none;position:absolute" :src="url" :style="motu_bottom_img_style" />
                          </a>
                      </div>
                      <div class="ad_msgMc" v-if="isShowClose">
                          <span class="mt_btn_close" @click="onClose($event)">关闭广告</span>
                          <div class="input__area" v-if="false" @click="onClickInputArea($event)">
                              <div>
                                <label>姓名</label>
                                <input type="text"/>
                              </div>
                          </div>
                      </div>
                  </div>`,
      computed: {
        isHorizontal() {
          return this.direction == "horizontal";
        }
      },
      methods: {
        init() {
          this.img_layout_style = {
            width: this.componentData.img_width + "px",
            height: this.componentData.img_height + "px",
            margin: "auto"
          };

          this.landingUrl = this.componentData.adsense[0].landingUrl;
          this.url = this.componentData.adsense[0].url;
          this.logo_img_src = this.componentData.adsense[0].logo_img_src;

          if (this.componentData.type == 8 || this.componentData.type == 10) {
            this.direction = "vertical";
          } else if (this.componentData.type == 9 || this.componentData.type == 11) {
            this.direction = "horizontal";
          }

          //折叠小图监测
          this.setMotuMonitor(this.componentData.adsense[0].logoImg_pvCode);
        },
        getCityData() {
          return new Promise((resolve, reject) => {
            $jquery.ajax({
              type: "get",
              url: this.componentData.adsense[0].fromUrl,
              dataType: "jsonp",
              jsonpCallback: "showData",
              timeout: 3000,
              async: false,
              global: false,
              cache: true,
              success: data => {
                resolve(data);
              },
              error: (XMLHttpRequest, textStatus, errorThrown) => {
                console.log("请求失败！");
                reject();
              }
            });
          });
        },

        setCss() {
          let imgBoxWidth, imgBoxHeight;
          let first_img_width = this.componentData.img_width;
          let first_img_height = this.componentData.img_height;
          if (this.componentData.type == 8 || this.componentData.type == 10) {
            imgBoxWidth = first_img_width - 20;
            imgBoxHeight = first_img_height - first_img_height / 5.7;
          } else {
            imgBoxWidth = first_img_width - first_img_width / 5.7;
            imgBoxHeight = first_img_height - 20;
          }
          //以上为先得到 原来网页上首张图的尺寸

          let img = new Image();
          img.src = this.url;

          img.onload = () => {
            //获得折叠图的底图尺寸
            let w = img.width;
            let h = img.height;

            let adImg_height, adImg_width;

            if (w / h < imgBoxWidth / imgBoxHeight) {
              // 底图 左右有空白，而高低被填满
              adImg_height = parseInt(imgBoxHeight);
              adImg_width = parseInt(imgBoxHeight * (w / h));
            } else {
              // 底图 上下有空白，而左右 被填满
              adImg_width = parseInt(imgBoxWidth);
              adImg_height = parseInt(imgBoxWidth / (w / h));
            }

            this.motu_bottom_img_style = {
              display: "block",
              width: adImg_width + "px",
              height: adImg_height + "px",
              position: "absolute",
              top: "50%",
              left: "50%",
              "margin-top": -adImg_height / 2 + "px",
              "margin-left": -adImg_width / 2 + "px"
            };

            if (this.componentData.type == 8 || this.componentData.type == 10) {
              this.motu_bottom_style = {
                display: "block",
                width: imgBoxWidth + "px",
                height: imgBoxHeight + "px",
                "margin-top": imgBoxHeight / 5.7,
                left: "0",
                right: "0",
                top: $jquery(".mt_pd_img").css("top")
              };
            } else {
              this.motu_bottom_style = {
                display: "block",
                width: imgBoxWidth + "px",
                height: imgBoxHeight + "px",
                "margin-left": imgBoxWidth / 5.7,
                top: "10px",
                background: "black",
                left: $jquery(".mt_pd_img").css("left")
              };
            }
          };
          return {
            first_img_width: first_img_width,
            first_img_height: first_img_height,
            imgBoxWidth: imgBoxWidth,
            imgBoxHeight: imgBoxHeight
          };
        },

        gotoLanding(landingUrl, e) {
          if (e.target.tagName == "DIV") {
            //表示点击的是 魔图，而不是原来的图片
            e.stopPropagation();
            e.preventDefault();
          } else {
            return;
          }

          if (this.movementAngle > 10) {
            //点击监测
            this.setMotuMonitor(this.componentData.adsense[0].cvCode);
            window.location.href = landingUrl;
          }
        },
        onClose(e) {
          e.stopPropagation();
          e.preventDefault();
          this.isShowClose = false;
          this.oriDomi.reset();

          setTimeout(() => {
            this.motu_bottom_style = { display: "none" };

            this.isShowUpArrow = true;
            this.isShowRightArrow = false;

            this.isShowBottomImage = false;
          }, 600);

          this.setMotuMonitor(this.componentData.closeCvCode);
        },
        onClickInputArea(e) {
          e.stopPropagation();
          e.preventDefault();
          console.log("onClickInputArea");
        },
        setMotuMonitor(urls) {
          console.log("调用监测.........");
          let urlArr = urls.split(",");
          for (let i = 0; i < urlArr.length; i++) {
            $jquery(".motu_monitor").append('<img src="' + urlArr[i] + '"  width="1" height="1" alt="" />');
          }
        }
      },
      created() {
        this.init();
      },

      mounted() {
        //调用折叠方法
        this.oriDomi = new OriDomi(".mt_the_img", {
          hPanels: 6, //垂直方向的 格子数
          vPanels: 6, //水平方向的 格子数
          ripple: true,
          shadingIntensity: 3,
          maxAngle: 80, //刚开始要设置为0，不需要折叠
          speed: 500,

          touchStartCallback: (startCoordinate, event) => {
            this.maxAngle = 80; //等到开始拖动时，才出现折叠

            let objWidth = this.setCss();
            this.first_img_width = objWidth.first_img_width;
            this.first_img_height = objWidth.first_img_height;
            this.imgBoxWidth = objWidth.imgBoxWidth;
            this.imgBoxHeight = objWidth.imgBoxHeight;
          },
          touchMoveCallback: (movementAngle, event) => {
            this.isShowBottomImage = true;

            this.movementAngle = movementAngle; //存到vue组件中
            this.movementAngle = movementAngle; //存到OriDomi对象中，

            if (this.componentData.type == 8 || this.componentData.type == 10) {
              this.motu_bottom_style.background = "black";
              this.motu_bottom_style.top = this.imgBoxHeight * ((100-movementAngle)/100)+"px";
                // -this.imgBoxHeight + (this.imgBoxHeight + this.first_img_height / 4.6) * (movementAngle / 100) + "px";
            } else {
              this.motu_bottom_style.background = "black";
              this.motu_bottom_style.left = this.imgBoxWidth* ((100-movementAngle)/100)+"px";
                // this.imgBoxWidth + 70 - (this.imgBoxWidth + this.first_img_width / 4.2) * (movementAngle / 100) + "px";

            }

            if (movementAngle > 40) {
              this.isShowClose = true;
            } else {
              this.isShowClose = false;
            }


            if (movementAngle > 10) {
              //提示按钮显示隐藏
              this.isShowRightArrow = true;
              this.isShowUpArrow = false;
            } else {
              this.isShowUpArrow = true;
              this.isShowRightArrow = false;

              this.isShowBottomImage = false;
              console.log("movementAngle", movementAngle);
            }
          },
          touchEndCallback: (endCoordinate, event) => {
            if (this.movementAngle > 50) {
              //推开50%后，进行大图曝光
              this.setMotuMonitor(this.componentData.adsense[0].pvCode);
            }
          }
        });

        if (this.componentData.type == 8 || this.componentData.type == 10) {
          this.oriDomi.accordion(0, "top");

          this.isShowUpArrow = true;
        } else {
          this.oriDomi.accordion(0, "left");

          this.isShowRightArrow = false;
        }
      }
    });
  }

  //创建 撕角 组件
  function createTearAngle(mtData) {
    Vue.component("motu-tear-angle", {
      data() {
        return {
          componentData: mtData,

          geoStores: {},

          provinceArr: [],
          province_title: "",
          provinceValue: "",

          cityArr: [],
          city_tile: "",
          cityValue: "",

          hometownArr: [],
          hometown_title: "",
          hometownValue: "",

          selectMcStyle: {
            "max-height": "",
            "box-sizing": "border-box",
            "padding-top": "10px"
          },

          page: 1,
          personInfoPage: 1,
          landingUrl: "",
          logo_img_src: "",

          username: "",
          phone: "",
          ischecked: true,

          rules: {
            username: { validate: true, message: "" },
            phone: { validate: true, message: "" },
            province: { validate: true },
            city: { validate: true },
            hometown: { validate: true }
          },

          isSubmitSuccess: false
        };
      },
      template: `<div style="position:relative; display:inline-block;" class="tear-angle">
                      <div class="flipbook">
                          <div>
                              <div class="mt_main" v-html="componentData.first_img.context.outerHTML">
                              </div>
                              <div class="opcity">
                                  <a class="opcity_a_href" :href="landingUrl"></a>
                                  <img style="position:relative;top:50%;transform:translate(0,-50%)" :src="getImageUrl()">
                              </div>
                              <span class="jMc">
                                  <span class="mt_jiao_img"></span>
                                  <img :src="logo_img_src" width="45" height="45" class="logo"/>
                                  <span class="mt_jiao_back"></span>
                              </span>
                          </div>
                          <div class="seconde_page">
                              <div class="page2_main" style="position: absolute;opacity: 0;" v-html="componentData.first_img.context.outerHTML"></div>
                              <a :href="landingUrl" class="mt_adImg_a">
                                  <img :src="getImageUrl()" @click="setMotuMonitor(componentData.adsense[0].cvCode)"/>
                              </a>
                              <div class="ad_msgMc" v-if="isOperate">
                                  <div class="person_info" v-show="personInfoPage==1">
                                      <span v-show="!rules.username.validate" class="name_error_msg">{{rules.username.message}}</span>
                                      <input type="text" v-model="username" class="name" placeholder="请输入您的名字" />
                                      <span v-show="!rules.phone.validate" class="phone_error_msg">{{rules.phone.message}}</span>
                                      <input type="text" v-model="phone" class="phone" placeholder="请输入11位手机号码" maxlength="11" />
                                      <input type="submit" value="预约" class="reservation" style="background:rgb(255, 255, 255);" :class="{disabled:!ischecked}" @click="gotoReserve()"/>
                                      <span class="register_info" id="register_is_agree" >
                                          <input id="mt_checked" type="checkbox" v-model="ischecked"  class="register_checkbox"/>注册即视为同意
                                          <a target="view_window" href="https://i.m.yiche.com/AuthenService/Register/PrivacyPolicy.html" style="color:#00ff00" >《隐私政策》</a>
                                      </span>
                                  </div>
                                  <div class="selectMc" :style="selectMcStyle" v-if="personInfoPage==2">
                                      <font class="backBtn"><<返回</font>
                                      <div style="position:relative">
                                          <span class="error_msg" v-if="!rules.province.validate">请选择{{province_title}}</span>
                                          <label class="label1 ll">{{province_title}}:</label>
                                          <select id="province" v-model="provinceValue" @change="handleChangeProvince">
                                              <option value="">请选择{{province_title}}</option>
                                              <option v-for="(item,index) in provinceArr" :key="index" :value="item">{{item}}</option>
                                          </select>
                                      </div>
                                      <div  style="position:relative">
                                          <span class="error_msg"  v-if="!rules.city.validate">请选择{{city_tile}}</span>
                                          <label class="label2 ll">{{city_tile}}:</label>
                                          <select id="city" v-model="cityValue" @change="handleChangeCity">
                                              <option value="">请选择{{city_tile}}</option>
                                              <option v-for="(item,index) in cityArr" :key="index" :value="item">{{item}}</option>
                                          </select>
                                      </div>
                                      <div  style="position:relative">
                                          <span class="error_msg" v-if="!rules.hometown.validate">请选择{{hometown_title}}</span>
                                          <label class="label3 ll">{{hometown_title}}:</label>
                                          <select id="dealer" v-model="hometownValue">
                                              <option value="">请选择{{hometown_title}}</option>
                                              <option v-for="(item,index) in hometownArr" :key="index" :value="item">{{item}}</option>
                                          </select>
                                      </div>
                                      <input type="submit" value="提交" class="tjBtn" @click="onSubmit" v-if="!isSubmitSuccess"/>
                                      <input type="text" v-else value="提交成功！" class="tjTxt"/>
                                  </div>
                              </div>
                              <span class="mt_btn_close" @click="onClose($event)">关闭广告</span>
                          </div>
                      </div>
                  </div>`,
      computed: {
        isSecondPage() {
          //撕角交互   撕角渐变交互
          return this.page == 2;
        },

        isOperate() {
          //撕角交互   撕角渐变交互
          return this.componentData.type == 7 || this.componentData.type == 13;
        }
      },
      methods: {
        init() {
          this.landingUrl = this.componentData.adsense[0].landingUrl;
          this.logo_img_src = this.componentData.adsense[0].logo_img_src;

          if (this.componentData.adsense[0].logoImg_pvCode) {
            //撕角小图曝光监测
            this.setMotuMonitor(this.componentData.adsense[0].logoImg_pvCode);
          }

          this.selectMcStyle["max-height"] = this.componentData.first_img.width() * 0.55 + "px";
        },

        getImageUrl() {
          let adsense = this.componentData.adsense[0];
          let imgurl = "";
          if (adsense.url && adsense.url != "" && adsense.url != null) {
            imgurl = adsense.url;
          } else {
            if (this.componentData.img_ratio < 1.5) {
              if (adsense.urlA && adsense.urlA != "" && adsense.urlA != null) {
                imgurl = adsense.urlA;
              } else {
                imgurl = adsense.urlB;
              }
            } else {
              if (adsense.urlB && adsense.urlB != "" && adsense.urlB != null) {
                imgurl = adsense.urlB;
              } else {
                imgurl = adsense.urlA;
              }
            }
          }
          return imgurl;
        },

        onClose(e) {
          e.stopPropagation();
          e.preventDefault();

          $jquery(".flipbook").turn("disable", false); //接触禁用撕角效果，可以正常翻页
          $jquery(".flipbook").turn("page", 1); //返回第一页

          if (this.componentData.adsense[0].closeCvCode) {
            this.setMotuMonitor(this.componentData.adsense[0].closeCvCode);
          }
        },

        gotoReserve() {
          if (!this.ischecked) {
            return;
          }

          if (this.username) {
            this.rules.username.validate = true;
          } else {
            this.rules.username.validate = false;
            this.rules.username.message = "姓名不能为空";
          }

          let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
          if (this.phone && phoneReg.test(this.phone)) {
            this.rules.phone.validate = true;
          } else {
            this.rules.phone.validate = false;
            this.rules.phone.message = "请正确填写手机格式";
          }

          if (!this.rules.username.validate || !this.rules.phone.validate) {
            return;
          }

          let params = {
            info: '{"name":"' + this.username + '","phone":"' + this.phone + '"}'
          };
          //   预定
          $jquery.ajax({
            type: "post",
            url: this.componentData.formSubmitUrl,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(params),
            async: false,
            success: data => {
              console.log(data);
              if (data.status_code == 200) {
                this.personInfoPage = 2;
                console.log("预定成功");
                this.isSubmitSuccess = false;
                this.provinceValue = "";
                this.cityValue = "";
                this.hometownValue = "";
              } else if (data.status_code == 300) {
                this.rules.phone.validate = false;
                this.rules.phone.message = "当前手机号已经预约过";
              } else {
                console.log("请求数据为空！");
              }
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
              console.log("请求失败！");
            }
          });
        },

        onSubmit() {
          if (this.provinceValue) {
            this.rules.province.validate = true;
          } else {
            this.rules.province.validate = false;
          }

          if (this.cityValue) {
            this.rules.city.validate = true;
          } else {
            this.rules.city.validate = false;
          }

          if (this.hometownValue) {
            this.rules.hometown.validate = true;
          } else {
            this.rules.hometown.validate = false;
          }

          if (!this.rules.province.validate || !this.rules.city.validate || !this.rules.hometown.validate) {
            return;
          }

          let params = {
            info:
              '{"province":"' +
              this.provinceValue +
              '","city":"' +
              this.cityValue +
              '","shop":"' +
              this.hometownValue +
              '","name":"' +
              this.username +
              '","phone":"' +
              this.phone +
              '"}',
            customerId: this.componentData.customerId,
            ext: this.componentData.adsense[0].ext,
            mediaId: this.componentData.mediaId,
            planId: this.componentData.planId,
            creativeId: this.componentData.creativeId,
            zoneId: this.componentData.zoneId,
            positionId: this.componentData.adsense[0].positionId
          };

          //提交监测
          if (this.componentData.adsense[0].form_svCode) {
            this.setMotuMonitor(this.componentData.adsense[0].form_svCode);
          }

          $jquery.ajax({
            type: "post",
            url: this.componentData.formSubmitUrl,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(params),
            async: false,
            success: data => {
              console.log(data);
              if (data.status_code == 200) {
                this.isSubmitSuccess = true;

                setTimeout(() => {
                  this.personInfoPage = 1;
                  this.username = "";
                  this.phone = "";
                }, 2000);
                console.log("提交成功");
              } else {
                console.log("请求数据为空！");
              }
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
              console.log("请求失败！");
            }
          });
        },

        setMotuMonitor(urls) {
          console.log("调用监测.........");
          let urlArr = urls.split(",");
          for (let i = 0; i < urlArr.length; i++) {
            $jquery(".motu_monitor").append('<img src="' + urlArr[i] + '"  width="1" height="1" alt="" />');
          }
        },

        getCityData() {
          return new Promise((resolve, reject) => {
            $jquery.ajax({
              type: "get",
              url: this.componentData.adsense[0].fromUrl,
              dataType: "jsonp",
              jsonpCallback: "showData",
              timeout: 3000,
              async: false,
              global: false,
              cache: true,
              success: data => {
                resolve(data);
              },
              error: (XMLHttpRequest, textStatus, errorThrown) => {
                console.log("请求失败！");
                reject();
              }
            });
          });
        },

        handleChangeProvince() {
          this.cityArr = [];
          this.cityValue = "";

          for (let i in this.geoStores[this.provinceValue]) {
            this.cityArr.push(i);
          }
        },

        handleChangeCity() {
          this.hometownArr = [];
          this.hometownValue = "";

          let obj = this.geoStores[this.provinceValue][this.cityValue];

          for (let i of obj) {
            this.hometownArr.push(i);
          }
        }
      },
      created() {
        this.init();
      },

      mounted() {
        //创建撕角
        $jquery(".flipbook").turn({
          width: this.componentData.img_width,
          height: this.componentData.img_height,
          elevation: 50,
          display: "single",
          gradients: true,
          turnCorners: "bl,br",
          acceleration: true,
          autoCenter: true
        });

        //监听撕角事件
        $jquery(".flipbook").on("turning", (event, page, view) => {
          if (page == 2) {
            this.page = 2;
            console.log("absolute");
            $jquery(".page2_main").css({ position: "absolute", opacity: 0 });
            $jquery(".mt_adImg_a").css({ position: "relative", opacity: 1 });

            $jquery(".flipbook").turn("disable", true); //禁止翻到 第一页，只能点击右上角关闭 回到第一页

            //大图监测曝光
            if (this.componentData.adsense[0].pvCode) {
              this.setMotuMonitor(this.componentData.adsense[0].pvCode);
            }
          } else {
            this.page = 1;
            $jquery(".opcity").css({ opacity: 0 });
            $jquery(".mt_adImg_a").css({ position: "relative", opacity: 1 });
          }
        });

        this.getCityData().then(data => {
          this.geoStores = data.geoStores;

          this.province_title = data.rows[1].title;
          this.city_tile = data.rows[2].title;
          this.hometown_title = data.rows[3].title;
          console.log("data========", data);
          for (let i in data.geoStores) {
            this.provinceArr.push(i);
          }
        });

        //撕角渐变交互   撕角渐变展示
        if (this.componentData.type == 13 || this.componentData.type == 14) {
          //屏幕上下滑动时
          window.onscroll = () => {
            let windowHeight = window.innerHeight;
            // jding 为随滚动，图片距顶高度  aaaa 为随滚动，图片中心 距顶百分比  bbbb为 图片顶部距顶高度。
            let radio =
              ($jquery(".flipbook").offset().top - $jquery(document).scrollTop()) / $jquery(".flipbook").offset().top;

            let opacity = 1 - radio;
            $jquery(".opcity").css({
              opacity: opacity
            });

            //下滑时，对第二页中的 隐藏第一页的处理
            $jquery(".page2_main").css({ position: "relative", opacity: 1 - opacity });
            $jquery(".mt_adImg_a").css({ position: "relative", opacity: opacity });

            if (opacity > 0.85) {
              $jquery(".page2_main").css({ position: "absolute", opacity: 0 });
              $jquery(".mt_adImg_a").css({ position: "relative", opacity: 1 });
              $jquery(".opcity").css({ opacity: 1 });

              $jquery(".flipbook").turn("disable", false);
              $jquery(".flipbook").turn("page", 2);
            } else if (opacity < 0.15) {
              $jquery(".page2_main").css({ position: "absolute", opacity: 0 });
              $jquery(".mt_adImg_a").css({ position: "relative", opacity: 1 });
              $jquery(".opcity").css({ opacity: 0 });

              $jquery(".flipbook").turn("disable", false);
              $jquery(".flipbook").turn("page", 1);
            }
          };

          //初始化，如果高度，离顶部太近，则直接翻到第2页
          let initRadio =
            1 - ($jquery(".flipbook").offset().top - $jquery(document).scrollTop()) / $jquery(".flipbook").offset().top;
          if (initRadio > 0.85) {
            $jquery(".page2_main").css({ position: "absolute", opacity: 0 });
            $jquery(".flipbook").turn("disable", false);
            $jquery(".flipbook").turn("page", 2);
          }
        }
      }
    });
  }

  start();
})(window);
