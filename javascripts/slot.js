/**
 * Created by 明阳 on 2014/12/22.
 */
var myStorage = {}
try {
    myStorage = localStorage
} catch (error) {
    alert('我们不能使用localstorage，重新刷新网页将清楚历史数据')
}
myStorage.unlucky = myStorage.unlucky || "{}"
function DataLength(fData)
{
    var intLength=0
    for (var i=0;i<fData.length;i++)
    {
        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
            intLength=intLength+2
        else
            intLength=intLength+1
    }
    return intLength
}
function getLuckyStar() {
    var unlucky = JSON.parse(myStorage.unlucky);
    var try_cnt = 0;
	var luckyStar ;
    var luckyName ;
    do {
        luckyStar = stars[parseInt(stars.length * Math.random())];
        luckyName = luckyStar[1];
        luckyStar = luckyStar[0];
        ++try_cnt;
        if(try_cnt > 100000) {
            for(var i = 0 ; i <= stars.length ; ++i) {
                if(i == stars.length) {
                    console.log("Can not find lucky star!");
                    luckyStar = "00000000";
                    luckyName = "按D重置";
                    return {
                        id:luckyStar,
                        name:luckyName
                    };
                }
                if(unlucky[stars[i][0]])continue;
                luckyName = luckyStar[1];
                luckyStar = luckyStar[0];
                break;
            }
        }
    }while(unlucky[luckyStar]);
    unlucky[luckyStar] = 1;
    myStorage.unlucky = JSON.stringify(unlucky);
    if(luckyName.length == 2) {
        luckyName = luckyName[0] + "&nbsp&nbsp"+ luckyName[1];
    }
    return {
        id:luckyStar,
        name:luckyName
    };
}

