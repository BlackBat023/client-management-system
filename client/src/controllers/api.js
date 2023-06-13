const API_BASE = "http://localhost:8000/api";

export default {
    FetchUsers: () => {
        return fetch(API_BASE + "/users/all")
        .then(response => response.json())
        .then(data => {
            if(data.success){
                // console.log(data.response)
                return data.response;
            } else {
                throw data.response.error;
            }
        })
        .catch(err => {
            alert(err);
        });
    },

    FetchUser: (id) => {
        if(id != null) {
            return fetch(API_BASE + "/users/" + id)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    return data.response.user;
                } else {
                    throw data.response.error;
                }
            }).catch(err => {
                alert(err);
            });
        }
    },
    CreateUser: (name, phone, address) => {
        if(
            name == "" ||
            phone == "" ||
            address == ""
        ) {
            return false;
        } else {

            return fetch(API_BASE + "/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, phone, address })
            }).then(response => response.json())
            .then(data => {
                if(data.success){
                    alert("User created successfully!")
                    return true;
                } else {
                    throw data.response.error;
                }
            }).catch(err => {
                alert(err);
            });
        }
    },
    UpdateUser: (name = "", phone = "", address = "", id = "") => {
        if(
            name == "" ||
            phone == "" ||
            address == "" ||
            id == ""
        ) {
            return false;
        }

        return fetch(API_BASE + "/users/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, phone, address })
        }).then(response => response.json())
        .then(data => {
            if(data.success){
                alert("User info updated successfully!")
                return true;
            } else {
                throw data.response.error;
            }
        }).catch(err => {
            alert(err);
        });
    },
    DeleteUser: (id) => {
        if(id != null) {
            return fetch(API_BASE + "/users/delete/" + id, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    alert("User removed successfully")
                    return true;
                } else {
                    throw data.response.error;
                }
            }).catch(err => {
                alert(err);
            });
        }
    },

    // api calls for Inventory section
    FetchProducts: () => {
        return fetch(API_BASE + "/products/all")
        .then(response => response.json())
        .then(data => {
            if(data.success){
                //console.log(data.response);
                return data.response;
            } else {
                throw data.response.error;
            }
        })
        .catch(err => {
            alert(err);
        });
    },

    FetchProduct: (id) => {
        if(id != null) {
            return fetch(API_BASE + "/products/" + id)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    return data.response.product;
                } else {
                    throw data.response.error;
                }
            }).catch(err => {
                alert(err);
            });
        }
    },

    AddProduct: (name, price, description, quantity) => {
        if(
            name == "" ||
            price == "" ||
            description == "" ||
            quantity == ""
        ) {
            return false;
        } else {
            return fetch(API_BASE + "/products/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, price, description, quantity })
            }).then(response => {
                response.json();
            })
            .then(data => {
                if(data.success){
                    alert("Item added successfully!")
                    return true;
                } else {
                    throw data.response.error;
                }
            }).catch(err => {
                alert(err);
            });
        }
    },

    UpdateProduct: (name = "", price = "", description = "", quantity = "", id = "") => {
        if(
            name == "" ||
            price == "" ||
            description == "" ||
            quantity == "" ||
            id == ""
        ) {
            console.log(name, price, description, quantity, id);
            return false;
        }

        return fetch(API_BASE + "/products/update/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, description, quantity })
        }).then(response => response.json())
        .then(data => {
            if(data.success){
                alert("Inventory record updated successfully!")
                return true;
            } else {
                throw data.response.error;
            }
        }).catch(err => {
            alert(err);
        });
    },

    DeleteProduct: (id) => {
        if(id != null) {
            return fetch(API_BASE + "/products/delete/" + id, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    alert("Inventory record removed successfully")
                    return true;
                } else {
                    throw data.response.error;
                }
            }).catch(err => {
                alert(err);
            });
        }
    },

    // Orders section

    CreateOrder: (product, qty, option, price, orderNo, fee, date, userId) => {
        let responseClone;
        if(
            product == "" ||
            qty == "" ||
            option == "" ||
            price == "" ||
            orderNo == "" ||
            date == "" ||
            userId == ""
        ) {
            return false;
        } else {

            return fetch(API_BASE + "/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ product, qty, option, price, orderNo, fee, date, userId })
            }).then((response) => {
                responseClone = response.clone();
                return response.json()
            })
            .then(data => {
                if(data.success){
                    alert("Order created successfully!")
                    return true;
                } else {
                    throw data.response.error;
                }
            }, (rejectionReason) => {
                console.log('Error parsing JSON from response: ', rejectionReason, responseClone);
                responseClone.text()
                .then((bodyText) => {
                    console.log('Receiving the following instead of valid JSON: ', bodyText);
                });
            }).catch(err => {
                alert(err);
            });
        }
    },

    FetchOrders: () => {
        return fetch(API_BASE + "/orders/all")
        .then(response => response.json())
        .then(data => {
            if(data.success){
                // console.log(data.response)
                return data.response;
            } else {
                throw data.response.error;
            }
        })
        .catch(err => {
            alert(err);
        });
    },

    FetchOrder: (id) => {
        if(id != null) {
            return fetch(API_BASE + "/orders/" + id)
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    return data.response.product;
                } else {
                    throw data.response.error;
                }
            }).catch(err => {
                alert(err);
            });
        }
    },

    UpdateOrder: (product = "", qty = "", option = "", price = "", orderNo = "", fee = "", date = "") => {
        if(
            product == "" ||
            qty == "" ||
            option == "" ||
            price == "" ||
            orderNo == "" ||
            fee == "" ||
            date == ""
        ) {
            return false;
        }

        return fetch(API_BASE + "/orders/update" + orderNo, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product, qty, option, price, orderNo, fee, date })
        }).then(response => response.json())
        .then(data => {
            if(data.success){
                alert("Inventory record updated successfully!")
                return true;
            } else {
                throw data.response.error;
            }
        }).catch(err => {
            alert(err);
        });
    },

    // Database Exporting section

    ExportClients: () => {
        return fetch(API_BASE + "/export/all", { responseType: 'arraybuffer' })
        .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'clients.xlsx');
            document.body.appendChild(fileLink);
            fileLink.clink();
        })
        
    }
}