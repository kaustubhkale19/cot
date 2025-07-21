import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainReactionComponent } from './chain-reaction.component';

describe('ChainReactionComponent', () => {
  let component: ChainReactionComponent;
  let fixture: ComponentFixture<ChainReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainReactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChainReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
