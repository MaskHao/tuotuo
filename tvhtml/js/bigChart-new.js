var windowWidth = window.innerWidth,
    bigFontSize = windowWidth / 1920 * 50,
    smallFontSize = windowWidth / 1920 * 20;
var charts = document.querySelectorAll('.bigchart');
charts = [].slice.call(charts);
charts.forEach(function (item, index) {
    item.style.width = '3rem';
    item.style.height = '2.65rem';
})
var bigchart0 = echarts.init(charts[0]);
var bigchart1 = echarts.init(charts[1]);
var bigchart2 = echarts.init(charts[2]);
function getBigchartOption(name ,per){
    return {
        baseOption:{
            title: {
                text: name,
                left: 'center',
                top: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize:bigFontSize
                }
            },
            backgroundColor: 'transparent',
            series: [
                {
                    name:'血压测量量',
                    type:'pie',
                    radius: ['75%', '95%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:per[0], name:'一级血压预警值'},
                        {value:per[1], name:'二级血压预警值'},
                        {value:per[2], name:'三级血压预警值'},
                        {value:per[3], name:'四级血压预警值'},
                    ]
                }
            ],
            color: ['#00aeff','#00ff90','#fffd7e', '#ff936d']
        }
        // media:[
        //     {
        //       query:{
        //           minWidth:1700
        //       },
        //        option: {
        //            title:{
        //                textStyle: {
        //                    fontSize:'10'
        //                }
        //            },
        //        }
        //     },
        //
        // ]
    }
}
bigchart1.setOption(getBigchartOption('血压', [0.8,0.1,0.06,0.04]));
bigchart0.setOption(getBigchartOption('心率', [0.78,0.12,0.06,0.04]));
bigchart2.setOption(getBigchartOption('血糖', [0.79,0.11,0.08,0.02]));


var smallcharts = document.querySelectorAll('.smallchart');
smallcharts = [].slice.call(smallcharts);
smallcharts.forEach(function(item, index){
    item.style.width = '1.1rem';
    item.style.height = '1.3rem';
})
var smallchart0 = echarts.init(smallcharts[0]);
var smallchart1 = echarts.init(smallcharts[1]);
var smallchart2 = echarts.init(smallcharts[2]);
var smallchart3 = echarts.init(smallcharts[3]);
function getSmallChartOption(name,color, percentage){
    return{
        title: [
            {
                text: name,
                left: 'center',
                top: 'bottom',
                textStyle: {
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: '微软雅黑',
                    fontSize: smallFontSize
                },
                padding:[40, 0, 0, 0]
            },
            {
                text: percentage * 100 + '%',
                textStyle: {
                    color: '#fff',
                    fontSize: smallFontSize
                },
                left: 'center',
                top: 'center'
            }
        ],
        backgroundColor: 'transparent',
        series: [
            {
                name:'血压预警值',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            fontSize: smallFontSize,
                            fontWeight: 'bold'
                        }
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:percentage, name:'一级血压预警值'},
                    {value:1 - percentage, name:'其他'}
                ]
            }
        ],
        color: [color,'#2d6281']
    }
}
smallchart0.setOption(getSmallChartOption('正常','#00aeff',0.8));
smallchart1.setOption(getSmallChartOption('一级预警','#00ff90',0.1));
smallchart2.setOption(getSmallChartOption('二级预警','#fffd7e',0.06));
smallchart3.setOption(getSmallChartOption('三级预警','#ff936d',0.04));