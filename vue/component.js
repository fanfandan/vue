var Main=Vue.component("Main",{
    template:`
      <div class="root">
        <div class="body">
          <div class="left">
            <router-view name="left">left</router-view>
          </div>
          <div class="right">
            <router-view name="right">right</router-view>
          </div>
        </div>
       </div>
    `
})

var left=Vue.component("left",{
    template:`
       <div>
      <ul>
        <div v-for="item in data">
             <li><router-link :to="'#'+item.id" >{{item.title}}</router-link> </li>
             <ul>
             <li v-for="item1 in item.child"><router-link :to="'#'+item1.id" >{{item1.title}}</router-link> </li>
             </ul>
        </div>
        
       </ul>
      </div>
    `,
    data(){
        return{
            menu:[

            ]
        }

    },
    mounted(){
        fetch("./app.text").then(function (e) {
            return e.json();
        }).then((e)=>{
            this.menu=e;
        })
    },
    computed:{
        data(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);
                }else {
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i]);
                            }else {
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i]);
                            }
                        }
                    }
                }
            }
            console.log(arr)
            return arr;
        }


    },
    watch:{
        $route(){
            var num=this.$route.hash.slice(1);
            var pos= (document.querySelector(".a"+num).offsetTop);
            console.log(pos);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)-70;
                })
                .start()

            animate()
            //////
        }
    }
})
var right=Vue.component("right",{
    template:`
    <div class="markdown-body">
      <div v-html="data1"></div>
    </div>     
    `,
    data(){
        return {
            data1:''
        }
    },
    mounted(){
        fetch("./demo.text").then(function (e) {
            return e.text();
        }).then((e)=>{
            this.data1=e;
        })
    },
})

var quick=Vue.component("quick",{
    template:`
       <div style="position: absolute; width: 100%;height:100%;padding-top: 40px">
         quick <br>
         quick <br>
         quick <br>
         quick <br>
        </div>
    `
})