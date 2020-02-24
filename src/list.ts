let gambitMasterList = [
    {
        name: "Cryo Blast",
        experiment: false,
        school: "Arsenal",
        level: "2",
        range: "30 feet",
        target: "Creature",
        pull_time: "Action",
        components: "Chemicals",
        duration: "10 minutes",
        scale: "Personal",
        description: "Make a ranged gambit attack against the target. On hit, it takes 2d6 cold damage and is restrained for the duration."
    },
    {
        name: "Cryo Blast",
        experiment: false,
        school: "Arsenal",
        level: "4",
        range: "15 feet",
        target: "1 square",
        pull_time: "Action",
        components: "Explosives",
        duration: "",
        scale: "Personal",
        description: "A section of wall or ceiling within the target area is destroyed, dealing 4d6 concussion damage to creatures within the square affected; Dexterity save for half damage."
    },
    {
        name: "Cryo Blast",
        experiment: false,
        school: "Arsenal",
        level: "4",
        range: "15 feet",
        target: "1 square",
        pull_time: "Action",
        components: "Explosives",
        duration: "",
        scale: "Personal",
        description: "A section of wall or ceiling within the target area is destroyed, dealing 4d6 concussion damage to creatures within the square affected; Dexterity save for half damage."
    },
    {
        name: "Cryo Blast",
        experiment: false,
        school: "Arsenal",
        level: "4",
        range: "15 feet",
        target: "1 square",
        pull_time: "Action",
        components: "Explosives",
        duration: "",
        scale: "Personal",
        description: "A section of wall or ceiling within the target area is destroyed, dealing 4d6 concussion damage to creatures within the square affected; Dexterity save for half damage."
    }
];

let renderList: any[] = [];

let schoolSelected: string = "all";

document.onreadystatechange = () => {
    if(document.readyState == "complete") {

        $.ajax({url:"/hyper/gambits/all"}).done(
            (gambits) => {
                if(gambits.length) {
                    gambitMasterList = gambits;
                }
                
                for(let i = 0; i < gambitMasterList.length; i++) {
                    renderList.push(gambitMasterList[i]);
                }

                renderItemList();
            }
        );

        $("#schoolSelect").on("change", 
            (e) => {
                schoolSelected = <string>$("#schoolSelect").val();
                filterBySchool(schoolSelected);
            }
        );

        $("#sortByLevel").on("click",
            (e) => {
                console.log("Sorting the master list");
                gambitMasterList.sort(
                    (a: any, b: any) => {
                        if(a.level == b.level) {
                            return 0;
                        } else if (a.level == "Trick" || (+a.level) < (+b.level)) {
                            return -1;
                        } else if (b.leve == "Trick" || (+b.level) < (+a.level)) {
                            return 1;
                        } else {
                            // console.log("WTF");
                            return 0;
                        }
                    }
                );

                filterBySchool(schoolSelected);
                renderItemList();
            }
        );

        $("#sortBySchool").on("click",
            (e) => {
                console.log("Sorting the master list");
                gambitMasterList.sort(
                    (a: any, b: any) => {
                        if(a.school.toLowerCase() == b.school.toLowerCase()) {
                            return 0;
                        } else {
                            return a.school.toLowerCase() > b.school.toLowerCase() ? 1 : -1;
                        }
                    }
                );

                filterBySchool(schoolSelected);
                renderItemList();
            }
        );
    }
}

function sortByLevel() {

}

function filterBySchool(schoolName: string) {
    renderList = [];
    for(let i = 0; i < gambitMasterList.length; i++) {
        if(schoolName == "all" || gambitMasterList[i].school.toLowerCase() == schoolName.toLowerCase()) {
            renderList.push(gambitMasterList[i])
        }
    }

    renderItemList();
}

function renderItemList() {
    $("#gambit-list-container").html("");
    
    for(let i = 0; i < renderList.length; i++) {
        $("#gambit-list-container").append(
            "<div class='card box column is-half'>" 
                + "<div class='card-header'>" 
                
                    + "<p class='card-header-title'>" + renderList[i].name + " (" + renderList[i].level + ")" + "</p>"
                    + "<br/>" 
                +"</div>"
                + "<div class='card-content'>"
                    + "<div class='columns is-mobile is-multiline is-gapless'>"
                        + "<div class='column is-6'><strong>School:</strong> </div><div class='column is-6'>" + renderList[i].school + "</div>"
                    
                        + "<div class='column is-6'><strong>Target:</strong> </div><div class='column is-6'>" + renderList[i].target + "</div>"
                        + "<div class='column is-6'><strong>Range:</strong> </div><div class='column is-6'>" + renderList[i].range + "</div>"
                        + "<div class='column is-6'><strong>Pull Time:</strong> </div><div class='column is-6'>" + renderList[i].pull_time + "</div>"
                        + "<div class='column is-6'><strong>Components:</strong> </div><div class='column is-6'>" + renderList[i].components + "</div>"
                        + "<div class='column is-6'><strong>Duration:</strong> </div><div class='column is-6'>" + renderList[i].duration + "</div>"
                        + "<div class='column is-6'><strong>Scale:</strong> </div><div class='column is-6'>" + renderList[i].scale + "</div>"
                    + "</div>"
                    + "<p class='content'>" + renderList[i].description + "</p>"
                + "</div>"
                
            
            +"</div>");


        /*
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Component
    </p>
    <a class="card-header-icon">
      <span class="icon">
        <i class="fa fa-angle-down"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
      <a>@bulmaio</a>. <a>#css</a> <a>#responsive</a>
      <br>
      <small>11:09 PM - 1 Jan 2016</small>
    </div>
  </div>
  <footer class="card-footer">
    <a class="card-footer-item">Save</a>
    <a class="card-footer-item">Edit</a>
    <a class="card-footer-item">Delete</a>
  </footer>
</div>
        */
    }
}



