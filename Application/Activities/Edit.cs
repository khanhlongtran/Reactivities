using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // This object from database
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                // This object from request
                // activity.Title = request.Activity.Title ?? activity.Title;
                // Source, Destination == Request, Object from source 
                _mapper.Map(request.Activity, activity);

                _context.SaveChanges();
            }
        }
    }
}