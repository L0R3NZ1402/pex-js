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

function ValidateInput(value, type) {
    switch (type.toLowerCase()) {
        case "text":
            // Only letters and spaces
            return /^[A-Za-z\s]+$/.test(value);

        case "number":
            // Whole or decimal numbers
            return /^-?\d+(\.\d+)?$/.test(value);

        case "email":
            // Basic email validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        case "phone":
            // Simple phone validation (digits, optional +, -, spaces)
            return /^\+?\d{7,15}$/.test(value.replace(/[-\s]/g, ''));

        case "alphanumeric":
            // Letters and numbers only
            return /^[A-Za-z0-9]+$/.test(value);

        case "url":
            // Basic URL validation
            return /^(https?:\/\/)?([\w\-])+(\.[\w\-]+)+[/#?]?.*$/.test(value);

        case "password":
            // At least 8 chars, one uppercase, one lowercase, one number, one special char
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value);

        default:
            return false;
    }
}
