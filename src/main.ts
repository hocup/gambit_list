let forParsing = <HTMLTextAreaElement>document.getElementById("forParsing");

class Category {
    name: string;
    options: string[];
    inputId: string;
}

let categories: Category[] = [
    {
        name: "School",
        options: [
            "Vehicles",
            "Arsenal",
            "Deception", 
            "Engineering", 
            "Influence", 
            "Medical", 
            "Splicing", 
            "Survival", 
            "Tactics", 
        ],
        inputId: "schoolInput"
    },
    { 
        name: "Range",
        options: [
            "Touch",
            "[0-9]+ feet",
            "[0-9]+ squares",
            "1 square",
            "Communications"
        ],
        inputId: "rangeInput"
    },
    {
        name: "Pull Time",
        options: [
            "Action",
            "Bonus Action"
        ],
        inputId: "timeInput"
    },
    {
        name: "Components",
        options: [],
        inputId: "componentsInput"
    },
    {
        name: "Target",
        options: [
            "Door",
            "Vehicle",
            "Item or vehicle",
            "Creature",
            "Machine",
            "Self",
            "Living creature",
            "Creature or vehicle",
            "Willing creature",
            "Dead creature"
        ],
        inputId: "targetInput"
    },
    {
        name: "Duration",
        options: [
            "1 round",
            "1d6 rounds",
            "[0-9]+ rounds",
            "[0-9]+ minutes",
            "[0-9]+ hours"
        ],
        inputId: "durationInput"
    },
    {
        name: "Scale",
        options: [
            "Vehicles",
            "Personal",
            "Personal and Vehicles"
        ],
        inputId: "scaleInput"
    }
]

document.getElementById("parseButton").onclick = () => {
    let base: String = forParsing.value;
    let splitByNewline = base.split("\n");
    console.log(base);


    // Pull in the gambit level
    let level = "Trick";
    let levelMatch = base.match(RegExp("Level [0-9]"));
    if(levelMatch) {
        level = levelMatch[0].split(" ")[1];
    }

    let levelField: HTMLInputElement = <HTMLInputElement>document.getElementById("levelInput");
    levelField.value = level;

    if(levelMatch) {
        base = base.slice(levelMatch[0].length);
    }

    console.log("newbase",base);

    for(let i = 0; i < categories.length; i++) {
        // console.log(categories[i].name)
        let catMatch = base.match(RegExp(categories[i].name));

        if(catMatch && categories[i].options.length) {
            for(let k in categories[i].options) {
                let regex = RegExp(categories[i].options[k]);
                let itemMatch = base.match(regex);
                if(itemMatch) {
                    // console.log(catMatch);
                    // console.log("Found item", itemMatch);

                    let inputEl = <HTMLInputElement>document.getElementById(categories[i].inputId);
                    inputEl.value = itemMatch[0];
                }
            }
            
        }
    }

    let desc: string = splitByNewline[splitByNewline.length - 1];
    let descInput: HTMLInputElement = <HTMLInputElement> document.getElementById("descriptionInput");

    console.log(desc);

    descInput.value = desc;

}

