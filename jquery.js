$(document).ready(function() {
    
    $("[name='armorShredder'], [name='armorShredderOnActive']").each(function (){
        this.checked = false;
        $("#inputArprFromGear").val('');
        armorShred();
        let initialDamageReduction = parseInt($("#boss-armor").val())/(parseInt($("#boss-armor").val()) - 22167.5 + 467.5 * 70) * 100;
        damage_reduction.innerHTML = "Damage Reduction: " + initialDamageReduction.toFixed(3) + "%";
    });

    $("p").click(function() {
        console.log( "You clicked a paragraph!" )
    });

    $(".rogwarr").on('change', function(){
        $( ".rogwarr" ).not(this).prop('checked', false);     
    });

    $(".curseReck").on('change', function(){
        $( ".curseReck" ).not(this).prop('checked', false);     
    });

 
    function armorShred(){
        let shredAmount = 0;
        let bossArmor = parseInt($("#boss-armor").val());
        let inputNumber = $("#inputArprFromGear").val();
        let remainingArmor = bossArmor;
        let damageReduction = bossArmor/(bossArmor - 22167.5 + 467.5 * 70) * 100;
        shredValues = [];
        if ($.isNumeric(inputNumber) == true){
            shredValues.push($("#inputArprFromGear").val());
            shredAmount += parseInt($("#inputArprFromGear").val());
        }
        $("[name='armorShredder']:checked, [name='armorShredderOnActive']:checked").each(function () {
            shredValues.push($(this).val());
            shredAmount += parseInt($(this).val());
            remainingArmor = bossArmor - shredAmount;
                if(remainingArmor < 0){
                    remainingArmor = 0;
                }
                
                if(shredAmount >= bossArmor){
                    overcap.innerHTML = "(" + parseInt(shredAmount - bossArmor) + " over Cap)";
                }
                else{
                    overcap.innerHTML = "";
                }
            
            damageReduction = remainingArmor/(remainingArmor - 22167.5 + 467.5 * 70) * 100;
        });    
            removed_armor.innerHTML = "Removed Armor: " + shredAmount;
            remaining_armor.innerHTML = "Remaining Armor: " + remainingArmor;
            damage_reduction.innerHTML = "Damage Reduction: " + damageReduction.toFixed(3) + "%";
    }

    $("#boss-armor, [name='armorShredder'], [name='armorShredderOnActive']").change(function() {
        armorShred();
        //console.log( "boss armor changed" );
    });


    let trinketLimit = 2;
    $(".trinket:input:checkbox").change(function (){
        //console.log( trinketLimit );
        if($(".trinket:input:checkbox:checked").length > trinketLimit){
            this.checked = false;
        }
        armorShred();
        //console.log( "trinketLimit check");
    });

    $("#gearButton").click(function (){
        
        let inputNumber = $("#inputArprFromGear").val();
        if ($.isNumeric(inputNumber) == true){
            //console.log("functionHelper Success");
            arprGearNumber.innerHTML = inputNumber;
            $("#functionHelper").prop('checked', true);
            //console.log(functionHelper);
            armorShred();
        }
        else{
            $("#inputArprFromGear").val('');
        }
    })

    $('#inputArprFromGear').keypress(function (event){
        if (event.which == 13){
            event.preventDefault();
            //console.log("successEnter");
            $("#gearButton").click();
        }
    });

    $("#resetButton").click(function (){
        $("#inputArprFromGear").val('');
        arprGearNumber.innerHTML = 0;
        armorShred();
    })
    
});

