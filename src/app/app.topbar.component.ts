import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-topbar',
    styleUrls: ['./app.topbar.component.scss'],
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
                    <div class="layout-topbar-logo" id="logolink" style="cursor: pointer; outline: none;" routerLink="/">
                        <img style="border:2px solid gray;border-radius:10px;height:43px;width:225px;" id="app-logo"
                             [src]="'/photoApp/assets/img/ONI_Branding.png'"
                             alt="loading...">
                    </div>
                </div>

                <div class="layout-topbar-right">
                    <a class="menu-button" href="#" (click)="appMain.onMenuButtonClick($event)">
                        <i class="pi pi-bars"></i>
                    </a>

                    <ul class="layout-topbar-actions">
                        <li #searchItem class="search-item topbar-item" [ngClass]="{'active-topmenuitem': appMain.search}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,searchItem)">
                                <span class="topbar-icon">
                                    <i class="pi pi-search"></i>
                                </span>
                            </a>

                            <div class="search-input-wrapper">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search"></i>
                                    <input type="text" pInputText placeholder="Search..."/>
                                </span>
                            </div>

                            <ul class="fadeInDown">
                                <div class="search-input-wrapper p-fluid">
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-search"></i>
                                        <input type="text" pInputText placeholder="Search..." (click)="appMain.searchClick = true;"/>
                                    </span>
                                </div>
                            </ul>
                        </li>
                        <li #notifications class="topbar-item notifications"
                            [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === notifications}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,notifications)">
                                <span class="p-overlay-badge topbar-icon">
                                    <i class="pi pi-bell" pBadge value="2"></i>
                                </span>
                            </a>
                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <h6 class="header-text">Notifications</h6>
                                    <span class="p-badge">2</span>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-clock"></i>
                                        <div class="notifications-item">
                                            <h6>Meeting with <span>Viper MSC</span> Team</h6>
                                            <span>Microsoft Teams</span>
                                        </div>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-th-large"></i>
                                        <div class="notifications-item">
                                            <h6><span>Search Form</span> is complete</h6>
                                            <span>37 Remaining Tasks</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li #messages class="topbar-item messages" [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === messages}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,messages)">
                                <span class="p-overlay-badge topbar-icon">
                                    <i class="pi pi-comments" pBadge value="3"></i>
                                </span>
                            </a>
                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <h6 class="header-text">Messages</h6>
                                    <span class="p-badge">3</span>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <img src="assets/img/peter-gibbons.jpg" alt="demo">
                                        <div class="messages-item">
                                            <h6>Hey! I set up a node server running on localhost</h6>
                                            <span>Gilfoyle</span>
                                        </div>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" class="topbar-message" (click)="appMain.onTopbarSubItemClick($event)">
                                        <img src="assets/img/peter-gibbons.jpg" alt="demo">
                                        <div class="messages-item">
                                            <h6>Ok. Let's meet after scrum. I will send you a meeting invite</h6>
                                            <span>Gilfoyle</span>
                                        </div>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" class="topbar-message" (click)="appMain.onTopbarSubItemClick($event)">
                                        <img src="assets/img/peter-gibbons.jpg" alt="demo">
                                        <div class="messages-item">
                                            <h6>Don't forget to upgrade to newest version of Angular</h6>
                                            <span>Gilfoyle</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li #settings class="topbar-item settings" [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === settings}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,settings)">
                                <span class="topbar-icon">
                                    <i class="pi pi-cog"></i>
                                </span>
                            </a>
                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <h6 class="header-text">Settings</h6>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-user"></i>
                                        <div class="settings-item">
                                            <h6>Account Info</h6>
                                        </div>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-users"></i>
                                        <div class="settings-item">
                                            <h6>Global Accounts</h6>
                                        </div>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-bell"></i>
                                        <div class="settings-item">
                                            <h6>Notification Preferences</h6>
                                        </div>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-lock"></i>
                                        <div class="settings-item">
                                            <h6>Login Settings</h6>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li #profile class="topbar-item user-profile"
                            [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === profile}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
                                <img style="height:20px;width:20px;" class="profile-image" src="/photoApp/assets/img/keyring-icon.png" alt="A">
                                <div class="profile-info">
                                    <h6 style="vertical-align:middle">JMORIARTY</h6>
                                   
                                </div>
                            </a>

                            <ul class="fadeInDown">
                                <li class="layout-submenu-header">
                                    <img class="profile-image" src="assets/img/loyd.gif" alt="A">
                                    <div class="profile-info">
                                        <h6>Jim Moriarty</h6>
                                        <span>Analyst</span>
                                    </div>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-cog"></i>
                                        <h6>Settings</h6>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-file-o"></i>
                                        <h6>Terms of Usage</h6>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-compass"></i>
                                        <h6>Support</h6>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                        <i class="pi pi-power-off"></i>
                                        <h6>Logout</h6>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <a class="layout-rightpanel-button" href="#" (click)="appMain.onRightPanelButtonClick($event)">
                        <i class="pi pi-arrow-left"></i>
                    </a>
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent {

    constructor(public appMain: AppMainComponent, public app: AppComponent) {
    }

}
