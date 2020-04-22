import React from 'react'

const Sidebar = () => {
    return (
        <nav id="sidebar">
        <div class="sidebar-header">
            <a><i class="lab la-google-drive"></i> OG Drive +</a>
        </div>

        <ul class="list-unstyled components">
            <a class="create-item"><i class="las la-plus-circle"></i> Create New Item</a>
            <a class="first" href="">
                <i class="las la-hdd"></i>
               My Drive
            </a>
            <a href="">
                <i class="las la-laptop"></i>
               Computers
            </a>
            <a href="">
                <i class="las la-users"></i>
               Shared with me
            </a>
            <a href="">
                <i class="las la-clock"></i>
               Recent
            </a>
            <a href="">
                <i class="lar la-star"></i>
               Starred
            </a>
            <a href="">
                <i class="las la-trash-alt"></i>
              Trash
            </a>
            <a href="">
                <i class="las la-server"></i>
              Backups
            </a>
        </ul>
        <ul  class="store-details">
            <a  href="">Store Details</a>
            <a class="row" href="">
                <i class="las la-cloud-upload-alt"></i>
                <div class="store-info">
                    <span>Storage</span>
                    <div class="progress mt-1">
                        <div class="progress-bar" role="progressbar" style={{width: '10%'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>60GB of 1TB used</small>

                </div>
            </a>
            <a class="row" href="">
                <i class="las la-cloud-upload-alt"></i>
                <div class="store-info">
                    <span>Photos</span>
                    <div class="progress mt-1">
                        <div class="progress-bar bg-danger" role="progressbar " style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small>750GB of 1TB used</small>

                </div>
            </a>
            <a class="row" href="">
                <i class="las la-sort-amount-up-alt"></i>
                <div class="store-info">
                    <span>Upgrade storage</span>
                   

                </div>
            </a>
        </ul>

    </nav>

    )
}

export default Sidebar
