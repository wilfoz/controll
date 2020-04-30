import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Comment } from '../../models/comment';
import { INFO } from '../../models/info';

@Component({
    selector: 'app-info-detail',
    templateUrl: './app-info-detail.component.html',
    styleUrls: ['./app-info-detail.component.scss']
})
export class InfoDetailComponent implements OnInit {

    public displayedColumns: string[] = ['activity', 'comment'];
    public dataSource = new MatTableDataSource()

    public color: string;
    public comments: string[];

    constructor(
        private dialogRef: MatDialogRef<InfoDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: INFO
    ) { }

    ngOnInit() {
        this.setColorRealeased();
        this.dataSource.data = this.handleComments();
    }

    setColorRealeased = () => {
        const status = this.data['released'];
        this.color = status === 'EMBARGO' ? 'accent' : 'primary';
    }

    handleComments = (): Comment[] => {
        return this.data.comments.map(data => {
            const comments = Object.assign({}, {activity: data['activity'], comment: data['comment'] })
            return comments;
        })
    }
    
    close = () => {
        this.dialogRef.close(null);
    }
}