import { Injectable } from '@angular/core';


export interface leftPanelDatas {
  title: string;
  desc: string;
  headCard: string;
  descCard: string;
}

@Injectable({
  providedIn: 'root',
})
export class LeftsidAuth {
  data!: leftPanelDatas | { title: "Not Found", desc: "Not Found", headCard: "Not Found", descCard: "Not Found" };
  loadData(pageName: string): leftPanelDatas | undefined {
    if (pageName === "/auth/login") {
      return {
        title: "Welcome Back",
        desc: `Sign in to access your MediCare dashboard and manage your healthcare with confidence.`,
        headCard: "Secure Access",
        descCard: "Your account is protected with encrypted authentication and secure sessions."
      };
    }

    if (pageName === "/auth/register") {
      return {
        title: "Create Your Account",
        desc: "Join MediCare today and take control of your appointments, prescriptions, and medical records.",
        headCard: "Getting Started",
        descCard: "Creating an account takes less than a minute and gives you access to all MediCare features."
      };
    }

    if (pageName === "/auth/reset-password") {
      return {
        title: "Reset Your Password",
        desc: "Don't worry we'll send a secure password reset link to your registered email address.",
        headCard: "Security First",
        descCard: "Reset links expire after 30 minutes to help keep your account safe."
      };
    }

    return undefined;
  }

}
