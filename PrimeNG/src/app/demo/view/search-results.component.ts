import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer, Representative} from '../domain/customer';
import {CustomerService} from '../service/customer.service';
import {Product} from '../domain/product';
import {ProductService} from '../service/product.service';
import {Table} from 'primeng/table';
import {AppBreadcrumbService} from 'src/app/app.breadcrumb.service';
import { ThisReceiver } from '@angular/compiler';
import { PhotoService } from '../service/photo.service';
import { MessageService } from 'primeng/api';
import { IAspect, IImageSource, ISecurityLabel } from 'src/app/shared/interfaces';

@Component({
    templateUrl: './search-results.component.html',
    styleUrls: ['./mediademo.scss', './search-results.scss'],
    styles: [
        `
            :host ::ng-deep .p-dialog .product-image {
                width: 150px;
                margin: 0 auto 2rem auto;
                display: block;
            }

            @media screen and (max-width: 960px) {
                :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                    text-align: center;
                }

                :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                    display: flex;
                }
            }

        `
    ],
})
export class TableDemoComponent implements OnInit {

@ViewChild('fileUpload') fileUpload: any;
@ViewChild('securityLabel') securityLabel: any;
@ViewChild('classLabel') classLabel: any;
@ViewChild('sconum') sconum: any;

    uploadedFiles: any[] = [];
    security_labels: ISecurityLabel[];
    aspects: IAspect[];
    image_sources: IImageSource[];

    typeOptions: any[];
    classLabels: any[];
    noImageSelected: string = "./assets/img/WaitingForSelection.png"
    selectedValue: string;
    selectedImage: string = this.noImageSelected;
    imageData: Customer[];
    customers1: Customer[];
    customers2: Customer[];
    customers3: Customer[];
    selectedCustomers1: Customer[];
    selectedCustomer: Customer;
    representatives: Representative[];
    statuses: any[];
    rowGroupMetadata: any;
    activityValues: number[] = [0, 100];

    productDialog: boolean;
    products: Product[];
    product: Product;

    customerDialog: boolean;
    customers: Customer[];
    customer: Customer;
    submitted: boolean;

    images: any[];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    @ViewChild('dt') table: Table;

    constructor(private customerService: CustomerService, 
                private productService: ProductService,
                private breadcrumbService: AppBreadcrumbService,
                private photoService: PhotoService,
                private messageService: MessageService
                ) {
        this.photoService.getImages().then(images => {
            this.images = images;
        });

        this.breadcrumbService.setItems([
            { label: 'Viper MSC' },
            { label: 'Search Results', routerLink: ['/uikit/table'] }
        ]);
    }

    saveCustomer() {
        this.submitted = true;

        if (this.customer.name.trim()) {
            if (this.customer.id) {
                this.customers1[this.findIndexById(this.customer.id)] = this.customer;
                if (this.customer.state == "uploaded")
                    this.customer.state="reviewed";
                else if (this.customer.state == "reviewed")
                    this.customer.state="approved";
                else if (this.customer.state == "approved")
                    this.customer.revoke=true;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Image Updated', life: 3000});
            } else {
                this.customer.id = this.createId();
                this.customer.image = 'product-placeholder.svg';
                this.customers1.push(this.customer);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Image Created', life: 3000});
            }

            this.customers1 = [...this.customers1];
            this.customerDialog = false;
            this.customer = {};
        }
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.customers1.length; i++) {
            if (this.customers1[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    hideDialog() {
        this.customerDialog = false;
        this.submitted = false;
    }

    editCustomer(customer: Customer) {
        this.customer = {...customer};
        this.customerDialog = true;
    }

    approveCustomer(customer: Customer) {
        this.customer = {...customer};
        this.customerDialog = true;
    }

    ngOnInit() {

        this.security_labels = [
            {value: 'CONFIDENTIAL_REL_TO_USA_FVEY', label: 'CONFIDENTIAL//REL TO USA, FVEY'},
            {value: 'CONFIDENTIAL_REL_TO_USA_GMIF', label: 'CONFIDENTIAL//REL TO USA, GMIF'},
            {value: 'SECRET_REL_TO_USA_CMFC_CMFP_GMIF', label: 'SECRET//REL TO USA, CMFC, CMFP, GMIF'},
            {value: 'SECRET_REL_TO_USA_FVEY', label: 'SECRET//REL TO USA, FVEY'},
            {value: 'SECRET_REL_TO_USA_CMFC_GMIF', label: 'SECRET//REL TO USA, CMFC, GMIF'},
            {value: 'TOP_SECRET_REL_TO_USA_FVEY', label: 'TOP SECRET//REL TO USA, FVEY'},
            {value: 'UNCLASSIFIED', label: 'UNCLASSIFIED'},
            {value: 'UNCLASSIFIED_DEVELOPMENT_SYSTEM_HIGH', label: 'UNCLASSIFIED//DEVELOPMENT SYSTEM HIGH'},
            {value: 'UNCLASSIFIED_DEVELOPMENT_SYSTEM_LOW', label: 'UNCLASSIFIED//DEVELOPMENT SYSTEM LOW'},
            ];
            
            this.image_sources = [
            {value: 'MALTA', label: 'MALTA'},
            {value: 'MEDIA', label: 'MEDIA'},
            {value: 'MISC', label: 'MISC'},
            {value: 'OPEN_SOURCE', label: 'OPEN SOURCE'},
            {value: 'OPMARINE', label: 'OPMARINE'},
            {value: 'OTHER', label: 'OTHER'},
            {value: 'PANAMA', label: 'PANAMA'},
            {value: 'R.A.F.', label: 'R.A.F.'},
            {value: 'SINGAPORE', label: 'SINGAPORE'},
            {value: 'SUEZ', label: 'SUEZ'},
            {value: 'THOMAS_B_ELLSWORTH', label: 'THOMAS B. ELLSWORTH'},
            {value: 'U.S.C.G.', label: 'U.S.C.G.'},
            {value: 'VP', label: 'VP'},
            {value: 'WIM', label: 'WIM'},
            ];
            
            this.aspects = [
            {value: 'ARIAL_OVERHEAD', label: 'ARIAL OVERHEAD'},
            {value: 'BOW', label: 'BOW'},
            {value: 'BOW_QUARTER', label: 'BOW QUARTER'},
            {value: 'BROADSIDE', label: 'BROADSIDE'},
            {value: 'CAPACITY_PLANS', label: 'CAPACITY_PLANS'},
            {value: 'CLOSEUP', label: 'CLOSEUP'},
            {value: 'CREW_LIST', label: 'CREW LIST'},
            {value: 'CREW_PHOTO', label: 'CREW PHOTO'},
            {value: 'DECKHOUSE', label: 'DECKHOUSE'},
            {value: 'ELECTRONICS_RADAR', label: 'ELECTRONICS RADAR'},
            {value: 'FIRE_SAFETY_PLANS', label: 'FIRE SAFETY PLANS'},
            {value: 'FLIR', label: 'FLIR'},
            {value: 'GENERAL_ARRANGEMENT_PLANS', label: 'GENERAL ARRANGEMENT PLANS'},
            {value: 'GENERAL_ARRANGEMENT_PROFILE', label: 'GENERAL ARRANGEMENT PROFILE'},
            {value: 'LIST', label: 'LIST'},
            {value: 'LOFARGRAM', label: 'LOFARGRAM'},
            {value: 'OTHER', label: 'OTHER'},
            {value: 'OTHER_PLANS', label: 'OTHER PLANS'},
            {value: 'PORT_BOW_QUARTER', label: 'PORT BOW QUARTER'},
            {value: 'PORT_STERN_QUARTER', label: 'PORT STERN QUARTER'},
            {value: 'STARBOARD_BOW_QUARTER', label: 'STARBOARD BOW QUARTER'},
            {value: 'STARBOARD_STERN_QUARTER', label: 'STARBOARD STERN QUARTER'},
            {value: 'STERN_QUARTER', label: 'STERN QUARTER'},
            {value: 'STERN', label: 'STERN'},
            {value: 'TEST', label: 'TEST'},
            ];


        this.productService.getImagesSmall().then(products => {
            this.products = products;
            this.products.forEach(product => 
                console.log()         
                );
        });

        this.typeOptions = [
            {label: 'PROD',   value:'PROD'},
            {label: 'ORIG',   value:'ORIG'}
        ];

        this.classLabels = [
            {label: 'top secret', value:'top-secret'}
        ];
        this.customerService.getImageData().then(customers => {
            this.customers1 = customers;
            // @ts-ignore
        });
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
    }
}
