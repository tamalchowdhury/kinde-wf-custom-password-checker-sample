import {
  onNewPasswordProvidedEvent,
  invalidateFormField,
  WorkflowSettings,
  WorkflowTrigger,
} from "@kinde/infrastructure";

// The setting for this workflow
export const workflowSettings: WorkflowSettings = {
  id: "onNewPasswordProvidedEvent",
  name: "Custome Password Validator",
  trigger: WorkflowTrigger.NewPasswordProvided,
  "bindings": {
    "kinde.widget": {}
  }
};

function customPasswordValidator(password: string) {
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUppercase) {
    return "Password must include at least one uppercase letter."
  }
  if (!hasLowercase) {
    return "Password must include at least one lowercase letter."
  }
  if (!hasNumber) {
    return "Password must include at least one number."
  }
  if (!hasSpecialChar) {
    return "Password must include at least one special character."
  }
  return null // valid password
}

// The workflow code to be executed when the event is triggered
export default async function Workflow(event: onNewPasswordProvidedEvent) {
  const password = event.context.auth.firstPassword

  const invalidMessage = customPasswordValidator(password)

  if(invalidMessage) {
    invalidateFormField("p_first_password", invalidMessage)
  }

}
