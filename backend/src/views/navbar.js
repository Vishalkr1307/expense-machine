export function initializeNavbar() {
    // Code related to navbar functionality can be placed here
    const token = localStorage.getItem("token");
    const profile = document.getElementById("profile");
    const logout = document.getElementById("logout");
    logout.addEventListener("click", handleLogout);
    getUser();

    function getUser() {
        if (token) {
            axios
                .post("/auth/profile", { token })
                .then((res) => {
                    console.log(res.data.user);
                    if (res.data.user.isPremium) {
                        let userDetail = document.getElementById("userdetail")
                        userDetail.textContent = "You have premium Membership"
                        userDetail.setAttribute("class", 'btn btn-primary')
                         document.getElementById("premiumButton").removeAttribute("disabled")
                         
                         document.getElementById("premiumButton").addEventListener("click",()=>{
                            window.location.href='premium.html'
                         })
                    }

                    let name = document.getElementById("name");
                    let email = document.getElementById("email");
                    email.textContent = res.data.user.email;
                    name.textContent = res.data.user.name;
                    document.getElementById("navlogin").style.display = "none";
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        }
    }

    function handleLogout() {
        localStorage.clear("token")
        window.location.reload();
    }
}
