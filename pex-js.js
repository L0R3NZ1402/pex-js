function Get(keyword) {
    return fetch("backend.php?keyword=" + encodeURIComponent(keyword)).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return response.json();
    });
}

function Set(keyword, params) {
    return fetch("backend.php?keyword=" + encodeURIComponent(keyword), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params) // send parameters in body
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    });
}
