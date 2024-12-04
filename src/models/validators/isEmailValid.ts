import Validator from "@/types/Validator";

const isEmailValid: Validator = (v: string) => {
    return /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(v);
}

export default isEmailValid;