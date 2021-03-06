import "./register.scss";
import html from "./register.hbs";
import { registerUser } from "../../services/storefront";
import { serialize, isFormFilled } from "../../utils.js";
import { signIn } from "../../services/change-component";

//TODO there are many other things to check (psw.length > 5, ...)

const submitListener = async () => {
    //TODO refactoring needed
    node.style.opacity = "0.2";
    const formData = serialize(node.querySelector("form"));
    formData.acceptsMarketing = formData.acceptsMarketing === "on";
    delete formData.confirmPassword;
    await registerUser(formData);
    node.style.opacity = "1";
    signIn();
};

const toggleBtn = () => {
    const btn = node.querySelector("button");
    isFormFilled(node)
        ? btn.removeAttribute("disabled")
        : btn.setAttribute("disabled", "true");
};

const init = (node) => {
    node.querySelector("[name=email]").value = sessionStorage.getItem("email");
    node.querySelector("button").addEventListener("click", submitListener);
    node.querySelector("form").addEventListener("input", toggleBtn);
};

const node = document.createElement("div");
node.innerHTML = html;

export const registerComponent = () => ({ dom: node, callback: init });
