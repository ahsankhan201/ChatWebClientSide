export interface AvatarData {
    isSet: boolean;
    image: string;
  }
  
export interface UserInfo {
    _id: string;
    isAvatarImageSet?: boolean;
    avatarImage?: string;
    username?: string;
  }


  
export interface User {
    _id: string;
    isAvatarImageSet: boolean;
  }
  
 export interface Chat {
    id: string;
  }
  
export interface State {
    contacts: User[];
    currentChat?: Chat;
    currentUser?: User;
  }

export interface Contact {
    _id: string;
    username?: string;
    avatarImage?: string;
  }
  
 export interface ContactsProps {
    contacts: Contact[];
    changeChat: (contact: Contact) => void;
  }
  
  
  