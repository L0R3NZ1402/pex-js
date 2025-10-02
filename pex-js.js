function GetSet(keyword, params = {}) {
    return $.ajax({
        url: "backend.php",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ keyword: keyword, params: params}),
    })
        .then(response => {
            if (response && response.success === false) {
                return Promise.reject(response.message || "Operation failed.");
            }

            return response;
        })
        .catch(error => {
            return Promise.reject(error);
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
