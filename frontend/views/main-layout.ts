import '@vaadin-component-factory/vcf-nav';
import '@vaadin/app-layout';
import { AppLayout } from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar';
import '@vaadin/icon';
import '@vaadin/menu-bar';
import type { MenuBarItem, MenuBarItemSelectedEvent } from '@vaadin/menu-bar';
import '@vaadin/scroller';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import type User from 'Frontend/generated/com/example/application/data/entity/User';
import { imageDataUrl } from 'Frontend/util';
import { html, render } from 'lit';
import { customElement } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { logout } from '../auth';
import { router } from '../index';
import { appStore } from '../stores/app-store';
import { Layout } from './view';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header slot="drawer">
          <h1 class="text-l m-0">${appStore.applicationName}</h1>
        </header>
        <vaadin-scroller slot="drawer" scroll-direction="vertical">
          <!-- vcf-nav is not yet an official component -->
          <!-- For documentation, visit https://github.com/vaadin/vcf-nav#readme -->
          <vcf-nav aria-label="${appStore.applicationName}">
            ${this.getMenuRoutes().map(
              (viewRoute) => html`
                <vcf-nav-item path=${router.urlForPath(viewRoute.path)}>
                  <span
                    class="navicon"
                    style="--mask-image: url('line-awesome/svg/${viewRoute.icon}.svg')"
                    slot="prefix"
                    aria-hidden="true"
                  ></span>
                  ${viewRoute.title}
                </vcf-nav-item>
              `
            )}
          </vcf-nav>
        </vaadin-scroller>

        <footer slot="drawer">
          ${appStore.user
            ? html`
                <vaadin-menu-bar
                  theme="tertiary-inline contrast"
                  .items="${this.getUserMenuItems(appStore.user)}"
                  @item-selected="${this.userMenuItemSelected}"
                ></vaadin-menu-bar>
              `
            : html`<a router-ignore href="login">Sign in</a>`}
        </footer>

        <vaadin-drawer-toggle slot="navbar" aria-label="Menu toggle"></vaadin-drawer-toggle>
        <h2 slot="navbar" class="text-l m-0">${appStore.currentViewTitle}</h2>

        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayout.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private getUserMenuItems(user: User): MenuBarItem[] {
    return [
      {
        component: this.createUserMenuItem(user),
        children: [{ text: 'Sign out' }],
      },
    ];
  }

  private createUserMenuItem(user: User) {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = 'var(--lumo-space-s)';
    render(
      html`
        <vaadin-avatar
          theme="xsmall"
          img="${until(imageDataUrl(user.profilePicture))}"
          name="${user.name}"
          tabindex="-1"
        ></vaadin-avatar>
        <span>${user.name}</span>
        <vaadin-icon icon="lumo:dropdown"></vaadin-icon>
      `,
      item
    );
    return item;
  }

  private userMenuItemSelected(e: MenuBarItemSelectedEvent) {
    if (e.detail.value.text === 'Sign out') {
      logout();
    }
  }

  private getMenuRoutes(): RouteInfo[] {
    return [
      {
        path: 'hello',
        title: 'Hello World',
        icon: 'globe-solid',
      },

      {
        path: 'about',
        title: 'About',
        icon: 'file',
      },

      {
        path: 'dashboard',
        title: 'Dashboard',
        icon: 'chart-area-solid',
      },

      {
        path: 'master-detail',
        title: 'Master-Detail',
        icon: 'columns-solid',
      },

      {
        path: 'rich-text-editor',
        title: 'Rich Text Editor',
        icon: 'edit',
      },

      {
        path: 'list',
        title: 'List',
        icon: 'th-solid',
      },

      {
        path: 'hello-world-designer',
        title: 'Hello World Designer',
        icon: 'globe-solid',
      },

      {
        path: 'master-detail-designer',
        title: 'Master Detail Designer',
        icon: 'columns-solid',
      },

      {
        path: 'hello-world-hilla',
        title: 'Hello World Hilla',
        icon: 'globe-solid',
      },

      {
        path: 'master-detail-hilla',
        title: 'Master Detail Hilla',
        icon: 'columns-solid',
      },

      {
        path: 'grid-with-filters',
        title: 'Grid with Filters',
        icon: 'filter-solid',
      },

      {
        path: 'chat',
        title: 'Chat',
        icon: 'comments',
      },

      {
        path: 'spreadsheet',
        title: 'Spreadsheet',
        icon: 'file-excel',
      },

      {
        path: 'map',
        title: 'Map',
        icon: 'map',
      },

      {
        path: 'collaborative-master-detail',
        title: 'Collaborative Master-Detail',
        icon: 'columns-solid',
      },

      {
        path: 'person-form',
        title: 'Person Form',
        icon: 'user',
      },

      {
        path: 'image-list',
        title: 'Image List',
        icon: 'th-list-solid',
      },

      {
        path: 'card-list',
        title: 'Card List',
        icon: 'list-solid',
      },

      {
        path: 'address-form',
        title: 'Address Form',
        icon: 'map-marker-solid',
      },

      {
        path: 'credit-card-form',
        title: 'Credit Card Form',
        icon: 'credit-card',
      },

      {
        path: 'checkout-form',
        title: 'Checkout Form',
        icon: 'credit-card',
      },
    ];
  }
}
