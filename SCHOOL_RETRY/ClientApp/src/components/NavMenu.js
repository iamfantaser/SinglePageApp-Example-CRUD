import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AuthButton } from './AuthButton';
import { AuthService } from '../serviceManager/servicesProvider';

import './NavMenu.css';

export class NavMenu extends Component {
 // static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
      };
  }

    toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
    }
    pointerHandler(e) {
    console.log(e.target)
    }
    arrayComp() {
        if (AuthService.isSignedIn()) {
            const arr = [{ text: 'List', to: '/users' }, { text: 'Roles', to: '/roles' }, { text: 'Tests', to: 'tests' }]
            for (let key in arr) {
                return (<NavItem>
                    <NavLink tag={Link} className="text-dark group" to={arr[key].to}>{arr[key].text}</NavLink>
                </NavItem>
                    )
            }
        }
    }
    render() {
        const arr = [{ text: 'List', to: '/users' }, { text: 'Roles', to: '/roles' }, { text: 'Tests', to: '/tests' }];
        const arrayComp = arr.map((item, index) => {
            return (
                <NavItem key={index}>
                    <NavLink tag={Link} className="text-dark group" to={item.to}>{item.text}</NavLink>
                </NavItem>
            )
        })
        
        return (
            <header>
                <Navbar  className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">School_Spa</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>

                                {arrayComp}
                               < AuthButton/>
                      
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
/*
<header class="main-header">
    <!-- nav-button-wrap-->
    <div class="nav-button but-hol">
        <span class="nos"></span>
        <span class="ncs"></span>
        <span class="nbs"></span>
        <div class="menu-button-text">Меню</div>
    </div>


    <!--  navigation bar -->
    <div class="nav-overlay">
        <div class="tooltip color-bg" style="top: 345px; left: 1076px;">Закрыть Меню</div>
    </div>

    <div class="nav-holder">
        <a class="header-logo">Uinflow</a>
        <div class="nav-title"><span>Меню</span></div>
        <div class="wrapper-slinky">
        </div>
        <div class="nav-inner-wrap">
            <div id="menu" class="slinky-menu nav-inner ">
                <ul class="active">
                    <li class="nav-menu-item"><a href="" class="">Главная</a></li>
                    <li class="nav-menu-item"><a href="" class="">Проекты</a>
                        <ul>
                            <li><a href="#">Landing Page</a></li>
                            <li><a href="">Онлайн Магазин</a></li>
                            <li><a href="">Копия Сайта</a></li>
                            <li><a href="">Корпоративный сайт</a></li>
                            <li><a href="">Сайт Блог</a></li>
                        </ul>
                    </li>
                    <li class="nav-menu-item"><a href="" class="nav">Заказать</a>
                        <ul>
                            <li><a href="">Web Disign </a></li>
                            <li><a href="">UI/UX интерфейс</a></li>
                            <li><a href="">CRM/CMS</a></li>
                            <li><a href="">SEO</a></li>
                            <li><a href="">Поддержка сайта</a></li>

                        </ul>
                    </li>
                </ul>
            </div>


        </div>
    </div>
    <!-- nav-button-wrap end-->
    <div class="filter">
        <div class="header-social">
            <ul>
                <li><a href="#"><i class="fab fa-facebook-f "></i></a></li>
                <li><a target="_blank" href="#"><i class="fab fa-twitter "></i></a></li>
                <li><a target="_blank" href="#"><i class="fab fa-linkedin "></i></a></li>
                <li><a target="_blank" href="#"><i class="fab fa-instagram "></i></a></li>
            </ul>

        </div>
        <!--  showshare -->
        <div class="show-share showshare">
            <i class="fal fa-share-square"></i>
            <span>Поделиться</span>
        </div>
        <!--  showshare end -->
    </div>
    <!-- share-box -->
    <div class="share-wrapper" style="display: none;">
        <div class="share-title">
            <span>Share</span>
        </div>
        <div class="close-share soa">
            <span>Close</span>
            <i class="fal fa-times "></i>
        </div>
        <div class="share-inner soa">
            <div id="share-container" class="ya-share2 share-container" data-bare
                data-services="collections,vkontakte,facebook,twitter,tumblr,viber,whatsapp,telegram">
            </div>
        </div>
    </div>
</header>
*/