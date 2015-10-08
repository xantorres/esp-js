// notice_start
/*
 * Copyright 2015 Keith Woods
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// notice_end

import esp from '../../src/index';

describe('Router', () => {

    var _router;

    beforeEach(() => {
        _router = new esp.Router();
    });

    describe('.registerModel()', () => {
        it('throws if arguments incorrect', () => {
            expect(() => {_router.registerModel(undefined, 'foo'); }).toThrow();
            expect(() => {_router.registerModel('foo', undefined); }).toThrow();
            expect(() => {_router.registerModel('foo', {}, 'not a function'); }).toThrow();
            expect(() => {_router.registerModel({ },{ }); }).toThrow(new Error('The modelId argument should be a string'));
            expect(() => {_router.registerModel("modelId", { },"notSomeOptions"); }).toThrow(new Error('The options argument should be an object'));
            expect(() => {_router.registerModel("modelId", { }, { preEventProcessor: {} }); }).toThrow(new Error('preEventProcessor on the options parameter is neither a function nor an object with a process() method'));
            expect(() => {_router.registerModel("modelId", { }, { preEventProcessor: "boo" }); }).toThrow(new Error('preEventProcessor on the options parameter is neither a function nor an object with a process() method'));
            expect(() => {_router.registerModel("modelId", { }, { postEventProcessor:{}}); }).toThrow(new Error('postEventProcessor on the options parameter is neither a function nor an object with a process() method'));
            expect(() => {_router.registerModel("modelId", { }, { postEventProcessor:"boo"}); }).toThrow(new Error('postEventProcessor on the options parameter is neither a function nor an object with a process() method'));
        });

        it('should throw if model already registered', () => {
            _router.registerModel('modelId', {});
            expect(() => {_router.registerModel('modelId', {}); }).toThrow(new Error('The model with id [modelId] is already registered'));
        });
    });
});