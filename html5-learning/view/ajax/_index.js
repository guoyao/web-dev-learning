/**
 * User: wuguoyao
 * Time: 12/12/11 10:46 PM
 */

init();

function init() {
    $.getScript("http://gumball.wickedlysmart.com/?callback=updateSales");
}

function updateSales(sales) {
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class", "saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        slimJs.$("#sales").appendChild(div);
    }
}