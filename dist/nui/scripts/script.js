let loaded = false;

let navHome = null;

$("#close").on("click", () => {
    $.post(`https://${GetParentResourceName()}/close`, JSON.stringify({}));
});

$("#nav_left").on("click", () => {
    // iFrame Back
    const frame = $(".frame")[0];
    frame.contentWindow.history.back();
});

$("#nav_right").on("click", () => {
    // iFrame Forward
    const frame = $(".frame")[0];
    frame.contentWindow.history.forward();
});

$("#nav_home").on("click", () => {
    // iFrame Home
    const frame = $(".frame")[0];
    frame.contentWindow.location.href = navHome;
});

$(() => {
    $(".container").css("display", "none");
});

window.addEventListener("message", (event) => {
    const data = event.data;
    console.log(JSON.stringify(data));
    const { type, state } = data;
    if (type === "toggle") {
        if (!loaded) {
            const { name, link } = data;
            console.log(`Changing to ${name} with link ${link}`);
            $(`.title`).text(name);
            const frame = $(".frame")[0];
            frame.src = link;
            navHome = link;
            loaded = true;
        }

        if (state) {
            $(".container").css("display", "flex");
        } else {
            $(".container").css("display", "none");
        }
    }
});
