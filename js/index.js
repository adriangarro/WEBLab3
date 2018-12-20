/*
		+----------------------------------------------------
        LAB COINS
        -----------------------------------------------------
        Author: Elberth Adrián Garro Sánchez
        -----------------------------------------------------
		file: index.js
		----------------------------------------------------+
*/

function modalScroll() {
    $(".modal").css({
        "overflow-y": "scroll",
        "-webkit-overflow-scrolling": "touch"
    });
}

function spinnerConfig() {
    let spinnerInput = $(".spinner input");
    $(".spinner .btn:first-of-type").on("click", function () {
        spinnerInput.val(parseInt(spinnerInput.val(), 10) + 1);
    });
    $(".spinner .btn:last-of-type").on("click", function () {
        let inputValue = parseInt(spinnerInput.val(), 10);
        if (inputValue > 1) {
            spinnerInput.val(inputValue - 1);
        }
    });
}

function startConfig() {
    $(document).ready(function () {
        modalScroll();
        spinnerConfig();
    });
}

function setOptionsInFCurrencySelect() {
    /************************* select currency *************************/
    // adding disabled option
    $("<option disabled selected value>Moneda</option>")
        .appendTo("#fromCurrency");
    $.ajax({
        url: "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json",
        success: function(currency_response) {
            $.each(JSON.parse(currency_response), function (i, val) {
                let currencyOption = "<option value="
                    + i
                    + ">"
                    + val.name
                    + "</option>";
                $(currencyOption).appendTo("#fromCurrency");
            });
        },
        error: function() {
            console.error("Error fetching currency.");
        }
    });
}

function controllCalculator() {
    $("#allClear").click(function () {
        $("#inputValue").val("");
        $("#searchCoin").hide();
        $("#results").hide();
        $("#tblBodyCoins").html("");
    });
    $("#0").click(function () {
        $("#inputValue").val(function() {
            return this.value + "3";
        });
    });
    $("#1").click(function () {
        $("#inputValue").val(function() {
            return this.value + "1";
        });
    });
    $("#2").click(function () {
        $("#inputValue").val(function() {
            return this.value + "2";
        });
    });
    $("#3").click(function () {
        $("#inputValue").val(function() {
            return this.value + "3";
        });
    });
    $("#4").click(function () {
        $("#inputValue").val(function() {
            return this.value + "4";
        });
    });
    $("#5").click(function () {
        $("#inputValue").val(function() {
            return this.value + "5";
        });
    });
    $("#6").click(function () {
        $("#inputValue").val(function() {
            return this.value + "6";
        });
    });
    $("#7").click(function () {
        $("#inputValue").val(function() {
            return this.value + "7";
        });
    });
    $("#8").click(function () {
        $("#inputValue").val(function() {
            return this.value + "8";
        });
    });
    $("#9").click(function () {
        $("#inputValue").val(function() {
            return this.value + "9";
        });
    });
    $("#comma").click(function () {
        $("#inputValue").val(function() {
            return this.value + ",";
        });
    });
    $("#equals").click(function () {
        if ($("#fromCurrency").val() && $("#inputValue").val() !== "") {
            $("#searchCoin").show();
            $("#results").show();
            $("#tblBodyCoins").html("");
            $.ajax({
                url: "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json",
                success: function(currency_response) {
                    let currencies = JSON.parse(currency_response);
                    const keys = Object.keys(currencies);
                    // get 10 random currencies:
                    for (let i = 0; i < 10; ++i) {
                        const randIndex = Math.floor(Math.random() * keys.length);
                        const randKey = keys[randIndex];
                        const currency = currencies[randKey];
                        let conversion = $("#fromCurrency").val() + "_" + randKey; // fromCurr_toCurr;
                        // getExchangeRate
                        $.ajax({
                            url: "http://free.currencyconverterapi.com/api/v5/convert?q=" + conversion + "&compact=y",
                            success: function(exchange_response) {
                                let value = exchange_response[conversion].val * parseFloat($("#inputValue").val());
                                let currencyRow = "<tr>"
                                + "<td>" + currency.code + "</td>"
                                + "<td>" + currency.name + "</td>"
                                + "<td>" + value + "</td>"
                                + "</tr>";
                                $(currencyRow).appendTo("#tblBodyCoins");
                            },
                            error: function() {
                                console.error("Error fetching exchange rate.");
                            }
                        });
                    }
                },
                error: function() {
                    console.error("Error fetching currency.");
                }
            });
            
        } else {
            alert("Debe elegir una moneda y establecer un monto a convertir.");
        }
    });
}

jQuery(
    startConfig(),
    setOptionsInFCurrencySelect(),
    controllCalculator()
);
