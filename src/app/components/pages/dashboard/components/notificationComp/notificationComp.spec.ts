import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComp } from './notificationComp';

describe('NotificationComp', () => {
  let component: NotificationComp;
  let fixture: ComponentFixture<NotificationComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComp],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
